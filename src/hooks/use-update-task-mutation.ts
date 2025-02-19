import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchTaskApi } from "@/api/task.ts";
import { Task } from "@/models/task.ts";
import { toast } from "react-toastify";
import { t } from "i18next";

function useUpdateTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: Task["id"]; partialTask: Partial<Task> }) =>
      patchTaskApi(data.id, data.partialTask),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    onError: () => toast.error(t("modal.somthingWentWrong")),
  });
}

export default useUpdateTaskMutation;
