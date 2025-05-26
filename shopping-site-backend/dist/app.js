import express from "express";
import { connectDB } from "./utils/feature.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import morgan from "morgan";
import { config } from "dotenv";
//importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";
config({
    path: "./.env"
});
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || "";
connectDB(mongoURI);
export const myCache = new NodeCache();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API is working with /api/v1");
});
//Using routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`Express is working on https://localhost:${port}`);
});
