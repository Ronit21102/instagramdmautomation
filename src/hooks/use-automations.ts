import { createAutomations } from "@/actions/automations";
import { useMutationData } from "./use-mutaution-data";

export const useCreateAutomation = (id?: string) => {
  const { isPending, mutate } = useMutationData(
    ["create-automations"],
    () => createAutomations(id),
    "user-automations"
  );
  return { isPending, mutate };
};
