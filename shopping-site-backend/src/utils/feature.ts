import mongoose, { Date } from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
import { InvalidCacheProps, orderItemType } from "../types/types.js";

export const connectDB = (uri: string) =>{
    mongoose.connect(uri,{
        dbName: "shopping-cart",
    })
    .then(c=>console.log(`DB Connected${c.connection.host}`))
    .catch(e=>console.log(e));
}

export const invalidCache = ({product,order,admin,userId,orderId,productId}:InvalidCacheProps) =>{
    if(product){
        const productKeys: string[] = [
            "latest-products",
            "categories",
           "all-products",
        ]

        if(typeof productId === "string") productKeys.push(`product-${productId}`);

        if(typeof productId === "object")
            productId.forEach((i) => {
                productKeys.push(`product-${i}`);
            })

        myCache.del(productKeys);
    }
    
    if(order){
         const orderKeys: string[] = [
            "all-orders",`my-orders-${userId}`,`order-${orderId}`
        ]

        myCache.del(orderKeys);

    }

    if(admin){
        myCache.del(["admin-stats","admin-pie-charts","admin-bar-charts","admin-line-charts"]);
    }
}

//Reduce Stock
export const reduceStock = async (orderItems:orderItemType[]) =>{
    for(let i=0; i < orderItems.length; i++){
        const order = orderItems[i];
        const product = await Product.findById(order.productId);  
        
        if(!product) throw new Error("Product Not Found");

        product.stock -= order.quantity;

        await product.save();
    }
}

export const calculatePercentage = (thisMonth: number,lastMonth: number) => {

    if(lastMonth === 0) return thisMonth * 100;
    const percent = ((thisMonth  / lastMonth) * 100);
    return Number(percent.toFixed(0));
};

export const getInventories = async({categories,productsCount,}: {categories: string[];productsCount: number;}) => {
  
    const categoriesCountPromise = categories.map((category) =>
      Product.countDocuments({ category })
    );

  const categoriesCount = await Promise.all(categoriesCountPromise);

  const categoryCount: Record<string, number>[] = [];

  categories.forEach((category, i) => {
    categoryCount.push({
      [category]: Math.round((categoriesCount[i] / productsCount) * 100),
    });
  });

  return categoryCount;
};


interface MyDocument { 
    createdAt: any;
    discount?: number;
    total?: number;
}

type FuncProps = {
    length: number;
    docArr: MyDocument[];
    today: any;
    property?: "discount" | "total";
};

export const getChartData = ({length, docArr, today, property}: FuncProps) => {
    const data: number[] = new Array(length).fill(0);

        docArr.forEach((i) => {
            const creationDate = i.createdAt;
            const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

            if(monthDiff < length){
                data[length - monthDiff - 1] += property ? i[property]! : 1;
            }
        });

        return data;
};