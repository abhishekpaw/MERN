import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AllDiscountResponse, DeleteDiscountRequest, MessageResponse, NewDiscountRequest, SingleDiscountResponse, UpdateDiscountRequest } from "../../types/api-types";

export const discountAPI = createApi({
  reducerPath: "discountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/payment/`,
  }),
  tagTypes:["discount"],
  endpoints: (builder) => ({
    alldiscounts: builder.query<AllDiscountResponse, string>({
      query: (userId) => `coupon/all?id=${userId}`,
      providesTags:["discount"],
    }),
    singlediscount: builder.query<SingleDiscountResponse, { id: string; userId: string }>({
      query: ({ id, userId }) => `coupon/${id}?id=${userId}`,
      providesTags:["discount"],
    }),
    newDiscount: builder.mutation<MessageResponse, NewDiscountRequest>({
      query: ({ formData, userId }) => ({
        url: `coupon/new?id=${userId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags:["discount"],
    }),
    
    updateDiscount: builder.mutation<MessageResponse, UpdateDiscountRequest>({
      query: ({ formData, userId,id }) => ({
        url: `coupon/${id}?id=${userId}`,
        method: "PUT",
        body: formData,
        headers: {
        "Content-Type": "application/json", // ✅ Required!
        },
      }),
      invalidatesTags:["discount"],
    }),

    deleteDiscount: builder.mutation<MessageResponse, DeleteDiscountRequest>({
      query: ({userId,id }) => ({
        url: `coupon/${id}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags:["discount"],
    }),
  }),
});

export const {useAlldiscountsQuery,useSinglediscountQuery,useNewDiscountMutation,useUpdateDiscountMutation,useDeleteDiscountMutation} = discountAPI;  