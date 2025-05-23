import { useMemo, useState, type ReactElement } from "react";
import AdminSidebar from "../components/AdminSidebar"
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import TableHOC from "../components/TableHOC";
import { FaTrash } from "react-icons/fa6";

interface DataType {
  Avatar: ReactElement;
  name: string;
  gender: string;
  email: string;
  role: string;
  action: ReactElement;
}

const img = "/src/assets/male_user.png";
const img2 = "/src/assets/female_user.png"

const arr: DataType[] =[
  {
    Avatar: <img height={34} src={img} alt="Product"/>,
    name: "Raj",
    gender : "male",
    email: "amask@gmail.com",
    role:"User",
    action: <button><FaTrash/></button>,
  },
  {
    Avatar: <img height={34} src={img2} alt="Product"/>,
    name:"Radha",
    gender : "female",
    email: "femail@gmail.com",
    role:"admin",
    action: <button><FaTrash/></button>,
  }
];



const columns: ColumnDef<DataType>[] = [
  { accessorKey:"Avatar",cell: (_info) => _info.getValue(), header: "Avatar",sortingFn: 'alphanumeric' },
  { accessorKey: "name", header: "Name",sortingFn: 'alphanumeric'},
  { accessorKey: "gender", header: "Gender",sortingFn: 'alphanumeric' },
  { accessorKey: "email", header: "Email",sortingFn: 'alphanumeric' },
  { accessorKey: "role", header: "Role",sortingFn: 'alphanumeric' },
  { accessorKey: "action",header:"Action",cell:(_row) => _row.getValue(),sortingFn: 'alphanumeric' },
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