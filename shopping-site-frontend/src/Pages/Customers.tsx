import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState, type ReactElement } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";
import AdminSidebar from "../components/AdminSidebar";
import { Skeleton } from "../components/loader";
import TableHOC from "../components/TableHOC";
import { useAllUsersQuery, useDeleteUserMutation } from "../redux/api/userAPI";
import type { RootState } from "../redux/store";
import type { CustomError } from "../types/api-types";
import { reponseToast } from "../utils/feature";

interface DataType {
  Avatar: ReactElement;
  name: string;
  gender: string;
  email: string;
  role: string;
  action: ReactElement;
}

const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "Avatar",
    cell: (_info) => _info.getValue(),
    header: "Avatar",
    sortingFn: "alphanumeric",
  },
  { accessorKey: "name", header: "Name", sortingFn: "alphanumeric" },
  { accessorKey: "gender", header: "Gender", sortingFn: "alphanumeric" },
  { accessorKey: "email", header: "Email", sortingFn: "alphanumeric" },
  { accessorKey: "role", header: "Role", sortingFn: "alphanumeric" },
  {
    accessorKey: "action",
    header: "Action",
    cell: (_row) => _row.getValue(),
    sortingFn: "alphanumeric",
  },
];

const Customers = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useAllUsersQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (userId: string) => {
    const res = await deleteUser({ userId, adminUserId: user?._id! });
    reponseToast(res, null, "");
  };
  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data)
      setRows(
        data.users.map((i) => ({
          Avatar: <img style={{borderRadius: "50%"}} src={i.photo} alt={i.name}/>,
          name: i.name,
          email: i.email,
          gender: i.gender,
          role: i.role,
          action: <button onClick={() => deleteHandler(i._id)}><FaTrash /></button>
          ,
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers"
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
    </div>
  );
};

export default Customers;
