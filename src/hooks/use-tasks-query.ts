import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/api/task.ts";
import { useContext } from "react";
import { FilterContext } from "@/providers/FilterProvider.tsx";

function useTasksQuery() {
  const { filters } = useContext(FilterContext);

  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => fetchTasks(filters),
    initialData: [],
  });
}

export default useTasksQuery;
