import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeTaskApi } from "@/api/task.ts";

function useDeleteTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeTaskApi,
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export default useDeleteTaskMutation;
