import { Pagination } from "@mui/material";
import React, { memo } from "react";
import { PaginationProps } from "../types/pagination";

const PaginationComp: React.FC<PaginationProps> = ({
  totalPages,
  page,
  handlePageChange,
}) => {
  return (
    <Pagination count={totalPages} page={page} onChange={handlePageChange} />
  );
};

export default memo(PaginationComp);
