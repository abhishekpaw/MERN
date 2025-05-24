import mongoose from "mongoose";
export const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017", {
        dbName: "shopping-cart",
    })
        .then(c => console.log(`DB Connected${c.connection.host}`))
        .catch(e => console.log(e));
};
