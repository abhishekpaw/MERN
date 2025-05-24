import express from "express";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/feature.js";
const port = 3000;
connectDB();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API is working with /api/v1");
});
app.use("/api/v1/user", userRoute);
app.listen(port, () => {
    console.log(`Express is working on https://localhost:${port}`);
});
