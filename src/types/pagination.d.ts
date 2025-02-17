// interface for pagination props
export interface PaginationProps {
  totalPages: number;
  page: number;
  handlePageChange: (event: any, pageArg: number) => void;
}
