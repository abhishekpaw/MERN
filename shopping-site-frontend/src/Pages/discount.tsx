import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState, type ReactElement } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { Skeleton } from "../components/loader";
import TableHOC from "../components/TableHOC";
import { useAlldiscountsQuery } from "../redux/api/discountAPI";
import type { CustomError } from "../types/api-types";
import type { UserReducerInitialState } from "../types/reducer-types";

interface DataType {
  _id: string;
  code: string;
  amount: number;
  action: ReactElement;
}

const columns: ColumnDef<DataType>[] = [
  { accessorKey: "_id", header: "Id", sortingFn: "alphanumeric" },
  { accessorKey: "code", header: "Code", sortingFn: "alphanumeric" },
  { accessorKey: "amount", header: "Amount", sortingFn: "alphanumeric" },
  {
    accessorKey: "action",
    cell: (_row) => _row.getValue(),
    header: "Action",
    sortingFn: "alphanumeric",
  },
];

const Discount = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const { data, isError,error, isLoading} = useAlldiscountsQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);


  if(isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

 useEffect(() => {
   if (data?.coupons) {
     const formatted: DataType[] = data.coupons.map((coupon) => ({
       _id: coupon._id,
       code: coupon.code,
       amount: coupon.amount,
       action: (
         <Link to={`/admin/discount/${coupon._id}`} className="manage-button">
           Manage
         </Link>
       ),
     }));

     setRows(formatted);
   }
 }, [data]);
 
  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Discounts",
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
      <Link to="/admin/discount/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Discount;
