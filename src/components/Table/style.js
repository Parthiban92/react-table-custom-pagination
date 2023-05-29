import styled from "styled-components";

const StyledTable = styled.table`
  border: 1px solid lightgray;
  border-spacing: initial;
  tbody {
    border-bottom: 1px solid lightgray;
  }
  td {
    padding: 6px 7px;
    border: 1px solid lightgray;
  }

  th {
    border-bottom: 1px solid lightgray;
    border-right: 1px solid lightgray;
    padding: 6px 7px;
    background-color: beige;
  }

  tfoot {
    color: gray;
  }

  tfoot th {
    font-weight: normal;
  }
  .pagination {
  }
`;

export const StyledDiv = styled.div`
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
 
`;

export const StyledSelect = styled.select`
border-radius: 14px;
    padding: 4px;`;

export default StyledTable;
