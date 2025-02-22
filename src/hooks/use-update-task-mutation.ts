import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { t } from "i18next";
import { patchTaskApi } from "@/api/task.ts";

function useUpdateTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchTaskApi,

    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["tasks"] }),

    onError: () => toast.error(t("modal.somthingWentWrong")),
  });
}

export default useUpdateTaskMutation;
