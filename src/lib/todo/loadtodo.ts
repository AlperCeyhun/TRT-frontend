import { fetchTodos, Todo } from "@/lib/todo/fetchtodo";

export const loadTodos = async (
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setTotalCount: React.Dispatch<React.SetStateAction<number>>,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
  setPageSize: React.Dispatch<React.SetStateAction<number>>,
  pageNumber = 1,
  pageSize = 5
) => {
  try {
    setLoading(true);
    const response = await fetchTodos(pageNumber, pageSize);
    setTodos(response.data);
    setTotalCount(Math.ceil(response.totalCount / pageSize));
    setPageNumber(response.pageNumber);
    setPageSize(response.pageSize);
  } catch (err: any) {
    setError(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};