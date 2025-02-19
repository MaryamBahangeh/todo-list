import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTaskApi } from "@/api/task.ts";
import { toast } from "react-toastify";
import { t } from "i18next";

function useAddTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTaskApi,
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    onError: () => toast.error(t("modal.somthingWentWrong")),
  });
}
export default useAddTaskMutation;
