import { useSearchParams } from "react-router";

interface PaginationParams {
  page: number;
  size: number;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
}

export const usePaginationParams = (
  defaultPage = 1,
  defaultSize = 10
): PaginationParams => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || defaultPage;
  const size = Number(searchParams.get("size")) || defaultSize;

  const setPage = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", String(newPage));
      return prev;
    });
  };

  const setSize = (newSize: number) => {
    setSearchParams((prev) => {
      prev.set("size", String(newSize));
      prev.set("page", "1"); // Reset to page 1 when size changes
      return prev;
    });
  };

  return { page, size, setPage, setSize };
};
