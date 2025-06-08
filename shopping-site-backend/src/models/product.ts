import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Name"],
    },
    photos: [
      {
        public_id: {
          type: String,
          required: [true, "Please Enter Public ID"],
        },
        url: {
          type: String,
          required: [true, "Please Enter URL"],
        },
      },
    ],
    price: {
      type: Number,
      required: [true, "Please Enter Price"],
    },
    stock: {
      type: Number,
      required: [true, "Please Enter Stock"],
    },
    category: {
      type: String,
      required: [true, "Please Enter Category"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter Description"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product",schema);