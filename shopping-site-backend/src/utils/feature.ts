import mongoose from "mongoose";
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

export const invalidCache = async({product,order,admin,userId,orderId,productId}:InvalidCacheProps) =>{
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
    const percent = (((thisMonth - lastMonth) / lastMonth) * 100);
    return Number(percent.toFixed(0));
};