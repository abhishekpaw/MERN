import type { ReactElement } from "react";

export type User = {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
  _id: string;
};

export type Product = {
  name: string;
  price: number;
  stock: number;
  category: string;
  photo: string;
  _id: string;
};

export type shippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
};

export type CartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

export type OrderItem = Omit<CartItem, "stock"> & { _id: string };

export type Order = {
  orderItems: OrderItem[];
  shippingInfo: shippingInfo;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
};

type CountAndChange = {
  revenue: number;
  product: number;
  user: number;
  order: number;
}

type LatestTransaction = {
  _id: string;
  amount: number;
  discoount: number;
  quantity: number;
  status: string;
}

export type Stats = {
  categoryCount: Record<string,number>[];
  changePercent: CountAndChange;
  count: CountAndChange;
  chart: {
    order: number[];
    revenue: number[];
  };
  userRatio:{
    male: number;
    female: number;
  };
  latestTransaction: LatestTransaction;
};


type OrderFullfillment = {
  processing: number;
  shipped: number;
  delivered: number;
};

type RevenueDistribution = {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
};

type UserAgeGroup = {
  teen: number;
  adult: number;
  old: number;
};

export type Pie = {
  orderFullfillment: OrderFullfillment,
  productCategories: Record<string, number>[],
  stockAvailability: {
    inStock: number;
    OutOfStock: number;
  };
  revenueDistribution:RevenueDistribution,
  adminCustomer: {
    admin: number;
    customer: number;
  };
  usersAgeGroup: UserAgeGroup,
};

export type Bar = {
  users: number[];
  product: number[];
  orders: number[];
};

export type Line = {
  users: number[];
  product: number[];
  discount: number[];
  revenue: number[];
};