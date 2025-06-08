import type { Bar, CartItem, CouponType, Line, Order, Pie, Product, shippingInfo, Stats, User } from "./types";


export type CustomError = {
    status: number;
    data: {
        message: string;
        success: boolean;
    };
};

export type MessageResponse = {
    success: boolean;
    message: string;
};

export type AllUsersResponse = {
    success: boolean;
    users: User[];
};

export type UserResponse = {
    success: boolean;
    user: User;
};

export type CategoriesResponse = {
    success: boolean;
    categories: string[];
};

export type AllProductsResponse = {
    success: boolean;
    products: Product[];
}; 

export type SearchProductResponse = AllProductsResponse & {
    totalPage: number;
};

export type ProductsResponse = {
    success: boolean;
    product: Product;
};

export type AllOrdersResponse = {
    success: boolean;
    orders: Order[];
};

export type OrderDetailsResponse = {
    success: boolean;
    order: Order;
};

export type StatsResponse = {
    success: boolean;
    stats: Stats;
};

export type PieResponse = {
    success: boolean;
    charts: Pie;
};

export type BarResponse = {
    success: boolean;
    charts: Bar;
};

export type LineResponse = {
    success: boolean;
    charts: Line;
};

export type SearchProductsRequest = {
    price: number;
    page: number;
    category: string;
    search: string;
    sort: string;
}



export type NewProductRequest = {
    id: string;
    formData: FormData;
};

export type UpdateProductRequest = {
    userId: string;
    productId: string;
    formData: FormData;
};

export type DeleteProductRequest = {
    userId: string;
    productId: string;
};


export type NewOrderRequest = {
  shippingInfo: shippingInfo;
  orderItems: CartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  user: string;
};

export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};

export type DeleteUserRequest = {
    userId: string;
    adminUserId: string;
}

export type AllDiscountResponse = {
success: boolean;
coupons: CouponType[];
};

export type SingleDiscountResponse = {
success: boolean;
coupons: CouponType[];
};

