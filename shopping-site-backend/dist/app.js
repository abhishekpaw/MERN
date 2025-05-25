import express from "express";
import { connectDB } from "./utils/feature.js";
import { errorMiddleware } from "./middlewares/error.js";
//importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import NodeCache from "node-cache";
const port = 3000;
connectDB();
export const myCache = new NodeCache();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API is working with /api/v1");
});
//Using routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`Express is working on https://localhost:${port}`);
});
