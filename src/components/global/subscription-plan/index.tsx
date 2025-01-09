// import { useQueryUser } from "@/hooks/user-queries";

import { useQueryUser } from "@/hooks/use-queries";

type Props = {
  type: "FREE" | "PRO";
  children: React.ReactNode;
};

export const SubscriptionPlan = ({ children, type }: Props) => {
  const { data } = useQueryUser();
  return data?.data?.profile.subscription?.plan === type && children;
};
