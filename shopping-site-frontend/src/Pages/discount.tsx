import { useFetchData } from "6pp";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState, type ReactElement } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { Skeleton } from "../components/loader";
import TableHOC from "../components/TableHOC";
import { server } from "../redux/store";
import type { AllDiscountResponse } from "../types/api-types";
import type { UserReducerInitialState } from "../types/reducer-types";

interface DataType {
  _id: string;
  code: string;
  amount: number;
  action: ReactElement;
}

const columns: ColumnDef<DataType>[] = [
  { accessorKey:"_id",header: "Id",sortingFn: 'alphanumeric' },
  { accessorKey:"code",header: "Code",sortingFn: 'alphanumeric' },
  { accessorKey: "amount", header: "Amount",sortingFn: 'alphanumeric'},
  { accessorKey: "action",cell:(_row) => _row.getValue(), header: "Action",sortingFn: 'alphanumeric' },
];



const Discount = () => {

      const {user} = useSelector(
    (state: {userReducer: UserReducerInitialState}) => state.userReducer
  );
    const { data, error, loading} = useFetchData<AllDiscountResponse>({
      url: `${server}/api/v1/payment/coupon/all?id=${user?._id}`,"key": "all-coupons",  
        dependencyProps: [user?._id!],
    });

const [rows, setRows] = useState<DataType[]>([]);

  if(error) {
    toast.error(error);
  }
    
  
  useEffect(() => {
    if (data) {
      setRows(
        data.coupons.map((i) => ({
            _id: i._id,
          code: i.code,
            amount: i.amount,
            action: <Link to={`/admin/discount/${i._id}`} className="manage-button">Manage</Link>,
        }))
      );
    }
  }, [data]);
const Table = TableHOC<DataType>(columns, rows, "dashboard-product-box", "Products")();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{loading ? <Skeleton length={20}/> : Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus/>
      </Link>
    </div>
  )
}

export default Discount