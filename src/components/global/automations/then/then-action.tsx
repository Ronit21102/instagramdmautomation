import { useListner } from "@/hooks/use-automations";
import React from "react";
import TriggerButton from "../trigger-button";

type Props = {
  id: string;
};

const ThenAction = ({ id }: Props) => {
  const { onSetListner, listener, onFormSubmit, isPending } = useListner(id);
  return <TriggerButton label="Then">Child</TriggerButton>;
};

export default ThenAction;
