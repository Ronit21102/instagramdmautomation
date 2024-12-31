import { cn } from "@/lib/utils";
import React from "react";
import { Spinner } from "./spinner";

type Props = {
  state: boolean;
  className?: string;
  children: React.ReactNode;
  color?: string;
};

const Loading = ({ children, state, className, color }: Props) => {
  return state ? (
    <div className={cn(className)}>
      <Spinner color={color} />
    </div>
  ) : (
    children
  );
};
export default Loading;
