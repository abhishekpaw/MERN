import type { CartItem, Order, Product, shippingInfo, User } from "./types";


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

export type SearchProductsRequest = {
    price: number;
    page: number;
    category: string;
    search: string;
    sort: string;
}

export type ProductsResponse = {
    success: boolean;
    product: Product;
};

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

export type AllOrdersResponse = {
    success: boolean;
    orders: Order[];
};

export type OrderDetailsResponse = {
    success: boolean;
    order: Order;
};

export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};