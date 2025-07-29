import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState, type ReactElement } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { Skeleton } from "../components/loader";
import TableHOC from "../components/TableHOC";
import { useAllProductsQuery } from "../redux/api/productAPI";
import type { CustomError } from "../types/api-types";
import type { UserReducerInitialState } from "../types/reducer-types";



interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}


const columns: ColumnDef<DataType>[] = [
  { accessorKey:"photo",cell: (_info) => _info.getValue(), header: "Photo",sortingFn: 'alphanumeric' },
  { accessorKey: "name", header: "Name",sortingFn: 'alphanumeric'},
  { accessorKey: "price", header: "Price",sortingFn: 'alphanumeric' },
  { accessorKey: "stock", header: "Stock",sortingFn: 'alphanumeric' },
  { accessorKey: "action",cell:(_row) => _row.getValue(), header: "Action",sortingFn: 'alphanumeric' },
];

const Products = () => {

  const {user} = useSelector(
    (state: {userReducer: UserReducerInitialState}) => state.userReducer
  );

  const { isLoading,isError,error,data } = useAllProductsQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);

  if(isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
    
  
  useEffect(() => {
    if (data) {
      setRows(
        data.products.map((i) => ({
          photo: <img src={i.photos?.[0]?.url} height={34} />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`} className="manage-button">Manage</Link>,
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(columns, rows, "dashboard-product-box", "Products")();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton length={20}/> : Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus/>
      </Link>
    </div>
  );
};

export default Products;