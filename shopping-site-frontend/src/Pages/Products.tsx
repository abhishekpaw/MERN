import { useMemo, useState, type ReactElement } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";



interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const img = "/src/assets/61IRRQ2gWPL.jpg";
const img2 = "/src/assets/NIKE+QUEST+6.png";

const arr: DataType[] =[
  {
    photo: <img height={34} src={img} alt="Product"/>,
    name: "Lenovo ThinkPad T14s Gen 5",
    price: 108087,
    stock: 15,
    action: <Link to="/admin/product/asdasdhj" className="manage-button">Manage</Link>,
  },
  {
    photo: <img height={34} src={img2} alt="Product"/>,
    name: "Nike Shoes",
    price: 4,
    stock: 300,
    action: <Link to="/admin/product/sd" className="manage-button">Manage</Link>,
  },
  {
    photo: <img height={34} src={img} alt="Product"/>,
    name: "Lenovo ThinkPad T14s Gen 5",
    price: 108087,
    stock: 15,
    action: <Link to="/admin/product/asdasdhj" className="manage-button">Manage</Link>,
  },
];



const columns: ColumnDef<DataType>[] = [
  { accessorKey:"photo",cell: (_info) => _info.getValue(), header: "Photo",sortingFn: 'alphanumeric' },
  { accessorKey: "name", header: "Name",sortingFn: 'alphanumeric'},
  { accessorKey: "price", header: "Price",sortingFn: 'alphanumeric' },
  { accessorKey: "stock", header: "Stock",sortingFn: 'alphanumeric' },
  { accessorKey: "action",cell:(_row) => _row.getValue(), header: "Action",sortingFn: 'alphanumeric' },
];

const Products = () => {
  const [data] = useState<DataType[]>(arr);
  const Table = useMemo(() => TableHOC<DataType>(columns, data, "dashboard-product-box", "Products"), [data]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table()}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus/>
      </Link>
    </div>
  );
};

export default Products;