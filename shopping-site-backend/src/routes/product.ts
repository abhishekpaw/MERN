import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { allReviewsOfProduct, deleteProduct, deleteReview, getAdminProducts, getAllCategories, getAllProducts, getlatestProduct, getSingleProduct, newProduct, newReview, updateProduct } from "../controllers/product.js";
import { multiUpload } from "../middlewares/multer.js";

const app = express.Router();


//To Create New Product - /api/v1/product/new
app.post("/new",adminOnly,multiUpload,newProduct);

//To get last 10 Products - /api/v1/product/latest
app.get("/latest",getlatestProduct);

//To Search Products
app.get("/all",getAllProducts);

//To get all unique categories - /api/v1/product/categories
app.get("/categories",getAllCategories);

//To get all Products - /api/v1/product/admin-products
app.get("/admin-products",adminOnly,getAdminProducts);

//To get update,delete Product
app.route("/:id").get(getSingleProduct).put(adminOnly,multiUpload,updateProduct).delete(adminOnly,deleteProduct);

app.get("/reviews/:id",allReviewsOfProduct);
app.post("/review/new/:id",newReview);
app.delete("/review/:id",deleteReview);

export default app;