import React, { useState } from "react";
import StyledTable, { StyledDiv, StyledSelect } from "./style";

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
  getSortedRowModel,
} from "@tanstack/react-table";


import Pagination from "../Paginaton";


const Table=({
  data,
  columns,
  onPagination,
  sort,
  onSortingChange
}: {
  data: any[];
  columns: ColumnDef<any>[];
}) =>{


    const [tableSort, setTableSort] = useState(sort);
  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    //
    debugTable: true,
    pageCount: 10,
    manualPagination: true,
    onSortingChange: setTableSort,
    state:{
        sorting: tableSort
    }
  });
console.log('tableSort', tableSort)

  // pageCount?: number;
  // manualPagination?: boolean;
  // onPaginationChange?: OnChangeFn<PaginationState>;
  // autoResetPageIndex?: boolean;
  // getPaginationRowModel?:
 
  const [currentPage, setCurrentPage] = useState(table.getState().pagination.pageIndex+1);
 
let PageSize = 10;
  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex =
     firstPageIndex + PageSize;
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
                  
                  <th key={header.id} colSpan={header.colSpan} >
                    {header.isPlaceholder ? null : (
                      <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

{{
                          asc: <span>&uarr;</span>,
                          desc: <span>&darr;</span>,
                        }[header.column.getIsSorted() as string] ?? null}
                          {/* {findsorting(header.id)} */}
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
      
        <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={100}
        pageSize={table.getState().pagination.pageSize}
        onPageChange={page =>{ setCurrentPage(page);  onPagination(table.getState().pagination.pageSize, page); }}
       numberOfRecords={table.getState().pagination.pageSize}
      />
       <div> <span>show </span> <span><StyledSelect
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            onPagination(Number(e.target.value), table.getState().pagination.pageIndex)
             table.setPageSize(Number(e.target.value));
            
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
               {pageSize} rows
            </option>
          ))}
        </StyledSelect></span></div>
      </StyledDiv>

      
     
    </div>
  );
}

export default Table;