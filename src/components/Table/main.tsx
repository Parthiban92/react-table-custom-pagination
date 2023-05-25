import React, { useState } from "react";
import StyledTable, { StyledDiv } from "./style";

import {
  Column,
  Table as ReactTable,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
  flexRender,
} from "@tanstack/react-table";


import { makeData, Person } from "./makeData";
import Pagination from "../Paginaton";

function App({ data, onPagination }) {
  const rerender = React.useReducer(() => ({}), {})[1];

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "first_name",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.last_name,
        id: "last_name",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "age",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "country",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "email",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "date_of_birth",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "phone",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  return (
    <>
      <Table
        {...{
          data,
          columns,
          onPagination
        }}
      />
     
    </>
  );
}

function Table({
  data,
  columns,
  onPagination
}: {
  data: Person[];
  columns: ColumnDef<Person>[];
}) {
  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    debugTable: true,
    pageCount: 10,
    manualPagination: true
  });


  // pageCount?: number;
  // manualPagination?: boolean;
  // onPaginationChange?: OnChangeFn<PaginationState>;
  // autoResetPageIndex?: boolean;
  // getPaginationRowModel?:
  const [currentPage, setCurrentPage] = useState(1);
let PageSize = 10;
  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);
  return (
    <div className="p-2">
      <div className="h-2" />
      <StyledTable>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {/* {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null} */}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>

      <StyledDiv>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
              onPagination(table.getState().pagination.pageSize, page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            console.log('test', Number(e.target.value))
            onPagination(Number(e.target.value), table.getState().pagination.pageIndex)
             table.setPageSize(Number(e.target.value));
            
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </StyledDiv>
      <Pagination
        className="pagination-bar"
        currentPage={table.getState().pagination.pageSize}
        totalCount={data.length}
        pageSize={100}
        onPageChange={page => setCurrentPage(page)}
      />
     
    </div>
  );
}

export default App;