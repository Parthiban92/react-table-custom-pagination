import React, { useState } from "react";
import Table from "../../components/Table/main";
import { GET_USERS } from "../../queries/queries";
import { useQuery } from "@apollo/client";

const App=() =>{
  const [tableData, setTableData] = useState([]);
  const { loading, error, data, refetch } = useQuery(GET_USERS, {
    variables: { limit: 10, page: 0 },
    onCompleted: (response) => handleFetchUsersRequestCallback(response, true),
    onError: (response) => handleFetchUsersRequestCallback(response),
  });

  const handleFetchUsersRequestCallback = (
    response,
    requestSuccess
  ) => {
    if (requestSuccess) {
      setTableData(response.users);
    } else {
      alert("Some error occuredd");
    }
  };


  const onPagination =(limit, pageSize)=>{
    refetch({ limit: limit, page: pageSize })
  }


  const gridData = React.useMemo(() => tableData, [tableData]);

  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName"
      },
      {
        Header: "Last Name",
        accessor: "lastName"
      }
    ],
    []
  );

  console.log('gridData',gridData)

  return (
    <Table
      columns={columns}
      data={gridData}
      loading={loading}
      pageCount={1000}
      onPagination={onPagination}
    />
  );
}

export default App;