import { type ColumnDef } from "@tanstack/react-table";
import TableHOC from "./TableHOC";



 
const columns:ColumnDef<DataType>[]= [
  {accessorKey:"_id",
    header:"ID"
  },
  {accessorKey:"quantity",
    header:"Quantity"
  },
  {accessorKey:"discount",
    header:"Discount"
  },
  {accessorKey:"amount",
    header:"Amount"
  },
  {accessorKey:"status",
    header:"Status"
  },  
]

interface DataType{
  _id:string;
  quantity:number;
  discount:number;
  amount:number;
  status:string
}

export const DashboardTable = ({data = []}:{data : DataType[]}) => {
  return TableHOC<DataType>(columns,data,"transaction-box","Top Transaction")();
}

export default DashboardTable;