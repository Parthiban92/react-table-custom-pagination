import React from "react";
import Table from './Table'


const Main=({ data, onPagination, onSortingChange })=> {
  const rerender = React.useReducer(() => ({}), {})[1];

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "first_name",
        header: () => <span>First Name</span>,
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
        header: () => <span>Age</span>,
      },
      {
        accessorKey: "country",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        header: () => <span>Country</span>,
      },
      {
        accessorKey: "email",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        header: () => <span>Email</span>,
      },
      {
        accessorKey: "date_of_birth",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        header: () => <span>Date of Birth</span>,
      },
      {
        accessorKey: "phone",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        header: () => <span>Phone</span>,
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
          onPagination,
          onSortingChange
        }}
      />
     
    </>
  );
}


export default Main;