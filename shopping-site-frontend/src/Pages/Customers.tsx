import { useMemo, useState, type ReactElement } from "react";
import AdminSidebar from "../components/AdminSidebar"
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import TableHOC from "../components/TableHOC";
import { FaTrash } from "react-icons/fa6";

interface DataType {
  Avatar: string;
  name: string;
  gender: string;
  email: string;
  role: string;
  action: ReactElement;
}

const img = "/src/assets/male_user.png";

const arr: DataType[] =[
  {
    Avatar: img,
    name: "Raj",
    gender : "male",
    email: "amask@gmai.com",
    role:"User",
    action: <Link to="/admin/product/asdasdhj" className="manage-button">Manage</Link>,
  },
  {
    Avatar: img,
    name:"Radha",
    gender : "female",
    email: "amask@gmai.com",
    role:"admin",
    action: <Link to="/admin/product/asdasdhj" className="manage-button">Manage</Link>,
  }
];



const columns: ColumnDef<DataType>[] = [
  { accessorKey:"Avatar",cell: (_info) => <img height={34} src={img} alt="Product"/>, header: "Avatar",sortingFn: 'alphanumeric' },
  { accessorKey: "name", header: "Name",sortingFn: 'alphanumeric'},
  { accessorKey: "gender", header: "Gender",sortingFn: 'alphanumeric' },
  { accessorKey: "email", header: "Email",sortingFn: 'alphanumeric' },
  { accessorKey: "role", header: "Role",sortingFn: 'alphanumeric' },
  { accessorKey: "action",header:"Action",cell:(_row) => <button><FaTrash/></button>,sortingFn: 'alphanumeric' },
];

const Customers = () => {
  const [data] = useState<DataType[]>(arr);
  const Table = useMemo(() => TableHOC<DataType>(columns, data, "dashboard-product-box", "Customers"), [data]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table()}</main>
    </div>
  );
};


export default Customers