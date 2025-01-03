"use client";
import { Button } from "@/components/ui/button";
import { AutomationDuoToneWhite } from "@/icons";
import React, { useMemo } from "react";
import Loading from "../loader";
import { useCreateAutomation } from "@/hooks/use-automations";
import { v4 } from "uuid";

type Props = {};

const CreateAutomation = (props: Props) => {
  const mutationId = useMemo(() => v4(), []);
  const { isPending, mutate } = useCreateAutomation(mutationId);
  return (
    <Button
      className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70]"
      onClick={() =>
        mutate({
          name: "Untitled",
          id: mutationId,
          createdAt: new Date(),
          keywords: [],
        })
      }
    >
      <Loading state={isPending}>
        <AutomationDuoToneWhite />
        <p className="lg:inline hidden">Create an Automation</p>
      </Loading>
    </Button>
  );
};

export default CreateAutomation;
