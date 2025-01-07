import {
  createAutomations,
  saveListner,
  updateAutomationName,
} from "@/actions/automations";
import { useMutationData } from "./use-mutaution-data";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import useZodForm from "./use-zod-form";
export const useCreateAutomation = (id?: string) => {
  const { isPending, mutate } = useMutationData(
    ["create-automations"],
    () => createAutomations(id),
    "user-automations"
  );
  return { isPending, mutate };
};

export const useEditAutomation = (automationId: string) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const enableEdit = () => setEdit(true);
  const disableEdit = () => setEdit(false);

  const { isPending, mutate } = useMutationData(
    ["update-automation"],
    (data: { name: string }) =>
      updateAutomationName(automationId, { name: data.name }),
    "automation-info",
    disableEdit
  );

  useEffect(() => {
    function handleClickOutside(this: Document, event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node | null)
      ) {
        if (inputRef.current.value !== "") {
          mutate({ name: inputRef.current.value });
        } else {
          disableEdit();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return { isPending, disableEdit, edit, enableEdit, inputRef };
};

export const useListner = (id: string) => {
  const [listener, setListener] = useState<"MESSAGE" | "SMARTAI">("MESSAGE");
  const promtSchema = z.object({
    prompt: z.string().min(1),
    reply: z.string(),
  });

  const { isPending, mutate } = useMutationData(
    ["create-listner"],
    (data: { prompt: string; reply: string }) =>
      saveListner(id, listener, data.prompt, data.reply),
    "automation-info"
  );

  const { errors, register, onFormSubmit, reset, watch } = useZodForm(
    promtSchema,
    mutate
  );

  const onSetListner = (type: "MESSAGE" | "SMARTAI") => setListener(type);
  return { onSetListner,listener, onFormSubmit, register,isPending, watch, reset };
};
