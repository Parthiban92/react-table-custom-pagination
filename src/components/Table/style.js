import styled from "styled-components";

const StyledTable = styled.table`
  border: 1px solid lightgray;

  tbody {
    border-bottom: 1px solid lightgray;
  }

  th {
    border-bottom: 1px solid lightgray;
    border-right: 1px solid lightgray;
    padding: 2px 4px;
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

export default StyledTable;
