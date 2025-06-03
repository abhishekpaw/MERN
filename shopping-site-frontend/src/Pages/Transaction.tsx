import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState, type ReactElement } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { Skeleton } from "../components/loader";
import TableHOC from "../components/TableHOC";
import { useAllOrdersQuery } from "../redux/api/orderAPI";
import type { CustomError } from "../types/api-types";
import type { RootState } from "../redux/store";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const columns: ColumnDef<DataType>[] = [
  { accessorKey:"user", header: "User",sortingFn: 'alphanumeric' },
  { accessorKey: "amount", header: "Amount",sortingFn: 'alphanumeric'},
  { accessorKey: "discount", header: "Discount",sortingFn: 'alphanumeric' },
  { accessorKey: "quantity", header: "Quantity",sortingFn: 'alphanumeric' },
  { accessorKey: "status", header: "Status",cell:(_row) => _row.getValue(),sortingFn: 'alphanumeric' },
  { accessorKey: "action",header:"Action",cell:(_row) => _row.getValue(),sortingFn: 'alphanumeric' },
];


const Transaction = () => {

  const {user} = useSelector(
      (state: RootState) => state.userReducer
    );
    
  const { isLoading,data,isError,error, } = useAllOrdersQuery(user?._id!);
  
  const [rows,setRows] = useState<DataType[]>([]);

  if(isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setRows(
        data.orders.map((i) => ({
          user: i.user.name,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: <span className={i.status === "Processing" ? "red" : i.status === "Shipped" ? "green" : "purple"}>{i.status}</span>,
          action: <Link to={`/admin/transaction/${i._id}`} className="manage-button">Manage</Link>,
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(columns, rows, "dashboard-product-box", "Transactions")();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton length={20}/> : Table}</main>
    </div>
  );
};

export default Transaction