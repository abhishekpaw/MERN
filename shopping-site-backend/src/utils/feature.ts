import mongoose from "mongoose"
import { InvalidCacheProps } from "../types/types.js";
import { Product } from "../models/product.js";
import { myCache } from "../app.js";

export const connectDB = () =>{
    mongoose.connect("mongodb://localhost:27017",{
        dbName: "shopping-cart",
    })
    .then(c=>console.log(`DB Connected${c.connection.host}`))
    .catch(e=>console.log(e));
}

export const invalidCache = async({product,order,admin}:InvalidCacheProps) =>{
    if(product){
        const productKeys: string[] = [
            "latest-products",
            "categories",
           "all-products",
        ]

        const products = await Product.find({}).select("_id");

        products.forEach(i => {
            productKeys.push(`product-${i._id}`);
        })

        myCache.del(productKeys);
    }
}