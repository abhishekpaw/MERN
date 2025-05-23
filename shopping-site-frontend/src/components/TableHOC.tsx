import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, type ColumnDef } from "@tanstack/react-table"
import { useReactTable } from "@tanstack/react-table"

function TableHOC <T>(columns: ColumnDef<T>[],data:T[],containerClassname: string,heading: string) {
  return function HOC (){

    const table = useReactTable({
      columns,
      data,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
        pagination: {
          pageIndex: 0, //custom initial page index
          pageSize: 5, //custom default page size
        },
      },
    });
    return (
      <div className={containerClassname}>
        <h2 className="heading">{heading}</h2>

        <table className="table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} colSpan={column.colSpan}>
                    <div
                      {...{
                        className: column.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: column.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        column.column.columnDef.header,
                        column.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[column.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        { (table.getRowModel().rows.length > 6) && (<div className="table-pagination">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Prev
            </button>
            <span>{table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}</span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>)
          
        }
      </div>
    );
  }
 
}

export default TableHOC


