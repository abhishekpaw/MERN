import type { ColumnDef } from "@tanstack/react-table";
import AdminSidebar from "../components/AdminSidebar"
import { useMemo, useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import TableHOC from "../components/TableHOC";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
  action: ReactElement;
}

const columns: ColumnDef<DataType>[] = [
  { accessorKey:"user", header: "User",sortingFn: 'alphanumeric' },
  { accessorKey: "amount", header: "Amount",sortingFn: 'alphanumeric'},
  { accessorKey: "discount", header: "Discount",sortingFn: 'alphanumeric' },
  { accessorKey: "quantity", header: "Quantity",sortingFn: 'alphanumeric' },
  { accessorKey: "status", header: "Status",sortingFn: 'alphanumeric' },
  { accessorKey: "action",header:"Action",cell:(_row) => <Link to="/admin/transaction/sd" className="manage-button">Manage</Link>,sortingFn: 'alphanumeric' },
];

const arr: DataType[] =[
  {
    user: "Charles",
    amount: 4500,
    discount : 400,
    quantity: 3,
    status:"Processing",
    action: <Link to="/admin/product/asdasdhj" className="manage-button">Manage</Link>,
  },
  {
    user: "Xaviours",
    amount: 6999,
    discount : 400,
    quantity: 6,
    status:"Shipped",
    action: <Link to="/admin/product/asdasdhj" className="manage-button">Manage</Link>,
  },
  {
    user: "Xaviours",
    amount: 6999,
    discount : 400,
    quantity: 6,
    status:"Delivered",
    action: <Link to="/admin/product/asdasdhj" className="manage-button">Manage</Link>,
  },
];

const Transaction = () => {
  const [data] = useState<DataType[]>(arr);
  const Table = useMemo(() => TableHOC<DataType>(columns, data, "dashboard-product-box", "Transactions"), [data]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table()}</main>
    </div>
  );
};

export default Transaction