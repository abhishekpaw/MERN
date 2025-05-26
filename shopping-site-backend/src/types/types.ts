import {Request, Response,NextFunction } from "express";

export interface NewUserRequestBody{
    name:string;  
    _id:string; 
    email: string;
    photo: string;
    gender: string;
    dob: Date;  
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export interface NewProductRequestBody{
    name:string;  
    category:string; 
    price: number;
    stock: number; 
}

export type SearchRequestQuery = {
    search?:string;  
    price?:string; 
    category?: string;
    sort?: string; 
    page?: string; 
}

export interface BaseQuery{
    name?: {
      $regex : string;
      $options : string;
    };
    price?: {
      $lte : number;
    };
    category?: string;
}

export type InvalidCacheProps = {
    product?:boolean;  
    order?:boolean; 
    admin?: boolean;
    userId?: string;
    orderId?: string;
    productId?: string | string[];
}

export type orderItemType = {
  length: number;
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
}

export type ShippingInfoType = {
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
}

export interface NewOrderRequestBody {
  shippingInfo: ShippingInfoType;
  user: string;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  orderItems: orderItemType[]
}
