import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState, type ReactElement } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import TableHOC from "../components/TableHOC";
import { useMyOrdersQuery } from "../redux/api/orderAPI";
import type { CustomError } from "../types/api-types";
import type { UserReducerInitialState } from "../types/reducer-types";
import type { RootState } from "../redux/store";

type DataType = {
    _id:string;
    amount:number;
    quantity:number;
    discount:number;
    status:ReactElement;
    action:ReactElement;
}

const column: ColumnDef<DataType>[] = [
  { accessorKey:"_id",header: "ID",sortingFn: 'alphanumeric' },
  { accessorKey: "amount", header: "Amount",sortingFn: 'alphanumeric'},
  { accessorKey: "quantity", header: "Quantity",sortingFn: 'alphanumeric' },
  { accessorKey: "discount", header: "Discount",sortingFn: 'alphanumeric' },
  { accessorKey: "status", cell:(_row) => _row.getValue(),header: "Status",sortingFn: 'alphanumeric' },
  { accessorKey: "action",header:"Action",cell:(_row) => _row.getValue(),sortingFn: 'alphanumeric' },
];

const Orders = () => {

    const {user} = useSelector(
      (state: RootState) => state.userReducer
    );
    
    const { isLoading,data,isError,error, } = useMyOrdersQuery(user?._id!);
    
  const [rows,setRows] = useState<DataType[]>([]);

    if(isError) {
        const err = error as CustomError;
        toast.error(err.data.message);
    }
  
    useEffect(() => {
      if (data) {
        setRows(
          data.orders.map((i) => ({
            _id: i._id,
            amount: i.total,
            discount: i.discount,
            quantity: i.orderItems.length,
            status: <span className={i.status === "Processing" ? "red" : i.status === "Shipped" ? "green" : "purple"}>{i.status}</span>,
            action: <Link to={`/admin/transaction/${i._id}`} className="manage-button">Manage</Link>,
          }))
        );
      }
    }, [data]);

  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
  )();
  return (
    <div className="container">
      <h1>My Orders</h1>
      {isLoading ? <Skeleton length={20}/> : Table}
    </div>
  );
};

export default Orders