import { stripe } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import { orderItemType, ShippingInfoType } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";

export const createPaymentIntent = TryCatch(async(req,res,next) => {

    const {id} = req.query;

    const user = await User.findById(id).select("name");

    if(!user) return next(new ErrorHandler("Please login first",401));

    const {items,shippingInfo,}: {items: orderItemType[];shippingInfo:ShippingInfoType;} = req.body;

    if(!items) return next(new ErrorHandler("Please Send Items",400));

    const productIDs = items.map((item) => item.productId);

    const products = await Product.find({ _id: { $in: productIDs},});

    const subtotal = products.reduce((prev,curr) => {
      const item = items.find((i) => i.productId === curr._id.toString());
      if(!item) return prev;
      return curr.price * item.quantity + prev;
    },0);

    const tax = subtotal * 0.18;

    const shipping = subtotal > 1000 ? 0 : 200;

    const total = Math.floor(subtotal + tax + shipping);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: "inr",
      description: "MERN Shopping",
      shipping: {
        name: user.name,
        address: {
          line1: shippingInfo.address,
          postal_code: shippingInfo.pincode.toString(),
          city: shippingInfo.city,
          state: shippingInfo.state,
          country: shippingInfo.country,  
        },
      },
    });

    res.status(201).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
});

export const newCoupon = TryCatch(async(req,res,next) => {

    const { code, amount} = req.body;

    if(!code || !amount){
        return next(new ErrorHandler("Please enter both coupon and amount",400));
    }
    
    await Coupon.create({code: code,amount});

    res.status(201).json({
      success: true,
      message: `Coupon ${code} Created Successfully.`,
    });
});

export const applyDiscount = TryCatch(async(req,res,next) => {

    const { coupon} = req.query;

    const discount = await Coupon.findOne({code:coupon});

    if(!discount){
        return next(new ErrorHandler("Invalid Coupon Code",400));
    }

    res.status(200).json({
      success: true,
      discount: discount?.amount,
    });
});

export const allCoupons = TryCatch(async(req,res,next) => {

    const coupons = await Coupon.find({});

    res.status(200).json({
      success: true,
      coupons,
    });
});

export const getCoupon = TryCatch(async(req,res,next) => {

    const {id} = req.params;

    const coupon = await Coupon.findById(id);

    if(!coupon){
        return next(new ErrorHandler("Invalid Coupon Code",400));
    }

    res.status(200).json({
      success: true,
      coupon,
    });
});

export const updateCoupon = TryCatch(async(req,res,next) => {

    const {id} = req.params;

    const { code, amount} = req.body;

    const coupon = await Coupon.findById(id);

    if(!coupon){
        return next(new ErrorHandler("Invalid Coupon Code",400));
    }

    if(!code || !amount){
        return next(new ErrorHandler("Please enter both code and amount",400));
    }

    if(code) coupon.code = code;
    if(amount) coupon.amount = amount;

    await coupon.save();

    res.status(200).json({
      success: true,
      meassage:`Coupon ${coupon.code} Updated Successfully`,
    });
});

export const deleteCoupon = TryCatch(async(req,res,next) => {

    const {id} = req.params;

    const coupon = await Coupon.findByIdAndDelete(id);

    if(!coupon){
        return next(new ErrorHandler("Invalid Coupon Code",400));
    }

    res.status(200).json({
      success: true,
      meassage:`Coupon ${coupon.code} Deleted Successfully`,
    });
});