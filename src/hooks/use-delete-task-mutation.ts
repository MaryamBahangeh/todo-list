import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { t } from "i18next";
import { removeTaskApi } from "@/api/task.ts";

function useDeleteTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeTaskApi,
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    onError: () => toast.error(t("modal.somthingWentWrong")),
  });
}

export default useDeleteTaskMutation;
