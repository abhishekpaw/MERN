import { createColumnHelper,  type Column,  type ColumnDef } from "@tanstack/react-table"
import TableHOC from "./TableHOC"
const columnHelper = createColumnHelper();


 
const columns:ColumnDef<DataType>[]= [
  {accessorKey:"id",
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
  id:string;
  quantity:number;
  discount:number;
  amount:number;
  status:string
}

export const DashboardTable = ({data = []}:{data : DataType[]}) => {
  return TableHOC<DataType>(columns,data,"transaction-box","Top Transaction")();
}

export default DashboardTable;