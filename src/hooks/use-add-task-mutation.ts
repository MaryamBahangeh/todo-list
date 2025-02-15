import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addTaskApi } from "@/api/task.ts";

function useAddTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTaskApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export default useAddTaskMutation;
