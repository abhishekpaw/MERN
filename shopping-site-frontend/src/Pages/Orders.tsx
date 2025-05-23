import { useState, type ReactElement } from "react";
import TableHOC from "../components/TableHOC";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

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
  const [row] = useState<DataType[]>([
    {
      _id: "asasdasdasd",
      amount: 45454,
      quantity: 23,
      discount: 5666,
      status: <span className="red">Processing</span>,
      action: <Link to={`/order/asasdasdasd`} className="manage-button">View</Link>,
    },
  ]);
  const Table = TableHOC<DataType>(
    column,
    row,
    "dashboard-product-box",
    "Orders",
  )();
  return (
    <div className="container">
      <h1>My Orders</h1>
      {Table}
    </div>
  );
};

export default Orders