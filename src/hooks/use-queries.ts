import {
  createAutomations,
  getAllAutomations,
  getAutomationInfo,
} from "@/actions/automations";
import { useQuery } from "@tanstack/react-query";

// it will make an api call on the  basis of function and a query key
export const useQueryAutomations = () => {
  return useQuery({
    queryKey: ["user-automations"],
    queryFn: getAllAutomations,
  });
};

export const useQueryAutomation = (id: string) => {
  return useQuery({
    queryKey: ["automation-info"],
    queryFn: ()=>getAutomationInfo(id),
  });
};
