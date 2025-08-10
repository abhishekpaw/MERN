import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api/productAPI";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import { orderAPI } from "./api/orderAPI";
import { dashbardAPI } from "./api/dashboardAPI";
import { discountAPI } from "./api/discountAPI";


export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    [discountAPI.reducerPath]: discountAPI.reducer,
    [dashbardAPI.reducerPath]: dashbardAPI.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userAPI.middleware,productAPI.middleware,orderAPI.middleware,dashbardAPI.middleware,discountAPI.middleware),
});


export type RootState = ReturnType<typeof store.getState>;