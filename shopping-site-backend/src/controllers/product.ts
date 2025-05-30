import { Request, Response, NextFunction } from "express";
import { TryCatch } from "../middlewares/error.js";
import {
  BaseQuery,
  NewProductRequestBody,
  SearchRequestQuery,
} from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm, unlink } from "fs";
import { myCache } from "../app.js";
import { invalidCache } from "../utils/feature.js";
//import {faker} from "@faker-js/faker";

//Revalidate on New,Update,Delete Product & on New Order
export const getlatestProduct = TryCatch(async (req, res, next) => {

  let products = [];

  if(myCache.has("latest-products")){
    products = JSON.parse(myCache.get("latest-products") as string);
  }else{
    products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    myCache.set("latest-products",JSON.stringify(products));
  }

  res.status(200).json({
    success: true,
    products,
  });
});

export const getAllCategories = TryCatch(async (req, res, next) => {
  let categories;

  if (myCache.has("categories")) {
    categories = JSON.parse(myCache.get("categories") as string);
  } else {
    categories = await Product.distinct("category");
    myCache.set("categories", JSON.stringify(categories));
  }

  res.status(200).json({
    success: true,
    categories,
  });
});

export const getAdminProducts = TryCatch(async (req, res, next) => {
  let products;

  if (myCache.has("all-products")) {
    products = JSON.parse(myCache.get("all-products") as string);
  } else {
    products = await Product.find({});
    myCache.set("all-products", JSON.stringify(products));
  }

  res.status(200).json({
    success: true,
    products,
  });
});

export const getSingleProduct = TryCatch(async (req, res, next) => {

  let product;
  const id = req.params.id;

  if (myCache.has(`product-${id}`)) {
    product = JSON.parse(myCache.get(`product-${id}`) as string);
  } else {
    product = await Product.findById(id);  
  
    if (!product) next(new ErrorHandler("Product Not Found", 404));

    myCache.set(`product-${id}`, JSON.stringify(product));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

export const newProduct = TryCatch(
  async (
    req: Request<{}, {}, NewProductRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, price, stock, category } = req.body;

    const photo = req.file;

    if (!photo) next(new ErrorHandler("Please Add Photo", 400));

    if (!name || !price || !stock || !category) {
      if (!!photo && !!photo.path) {
        rm(photo.path, (err) => {
          if (err) console.error("Error deleting file:", err);
          else console.log("Deleted");
        });
      }
      next(new ErrorHandler("Missing required fields", 400));
    }

    const product = await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: photo?.path,
    });

      invalidCache({ product: true, admin:true });
    
    res.status(201).json({
      success: true,
      message: `Product Created Successfully,${product.name}`,
    });
  }
);

export const updateProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const { name, price, stock, category } = req.body;

  const photo = req.file;

  const product = await Product.findById(id);

  if (!product) next(new ErrorHandler("Invalid Product Id", 404));

  if (!!product) {
    if (!!photo) {
      rm(product.photo!, () => {
        console.log("Old Photo Deleted");
      });
      product.photo = photo.path;
    }

    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;
    await product.save();
  }

  if(product?._id){
    invalidCache({ product: true, productId: String(product._id),admin:true});
  }

  res.status(200).json({
    success: true,
    message: `Product Updated Successfully.`,
  });
});

export const deleteProduct = TryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) next(new ErrorHandler("Product Not Found", 404));

  if (!!product) {
    rm(product.photo!, () => {
      console.log("Product Photo Deleted");
    });
    await product.deleteOne();
  }

  if(product?._id){
    invalidCache({ product: true, productId: String(product._id),admin:true});
  }


  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

export const getAllProducts = TryCatch(
  async (req: Request<{}, {}, SearchRequestQuery>, res, next) => {
    const { search, sort, category, price } = req.query;

    const page = Number(req.query.page) || 1;

    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;

    const skip = (page - 1) * limit;

    const baseQuery: BaseQuery = {};

    if (search) {
      baseQuery.name = {
        $regex: String(search),
        $options: "i",
      };
    }

    if(price){
      baseQuery.price={
        $lte: Number(price),
      }
    }

    if(category){
      baseQuery.category = String(category)
    } 
   
    const productsPromise = Product.find(baseQuery).sort(
      sort && {price: sort === "asc" ? 1 : -1}
    ).limit(limit).skip(skip);

    const[products,filteredOnlyProduct] = await Promise.all([
      productsPromise,Product.find(baseQuery),
    ])

    const totalPage = Math.ceil(filteredOnlyProduct.length / limit);

    res.status(200).json({
      success: true,
      products,
      totalPage,
    });
  }
);

// const generateRandomProducts = async (count: number = 10) => {
//     const products = [];

//     for (let i=0; i < count; i++){
//       const product = {
//         name: faker.commerce.productName(),
//         photo: "uploads\acdb50e0-7ae6-4ca0-93b6-15f12f13cfac.jpg",
//         price: faker.commerce.price({min:1500,max:80000,dec:0}),
//         stock: faker.commerce.price({min:0,max:100,dec:0}),
//         category: faker.commerce.department(),
//         createdAt: new Date(faker.date.past()),
//         updatedAt: new Date(faker.date.recent()),
//         __v:0
//       };
//       products.push(product);
//     }

//     await Product.create(products);

//     console.log({success: true});
// };


// const deleteRandomsProducts = async (count: number = 10) => {
//     const products = await Product.find({}).skip(2);
    
//     for(let i = 0; i < products.length; i++){
//       const product = products[i];
//       await product.deleteOne();
//     }

//     console.log({success:true});
// }

//generateRandomProducts(40);

//deleteRandomsProducts(30);