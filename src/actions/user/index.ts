"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { findUser } from "./queries";
import { refreshToken } from "@/lib/fetch";
import { updateIntegration } from "../integrations/queries";

export const onCurrentUser = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return user;
};

export const onBoardUser = async () => {
  const user = await onCurrentUser();
  console.log(user.id);
  try {
    const found = await findUser(user.id);
    console.log("onBoardUser -> found", found);
    if (found && found.integrations && found.integrations.length > 0) {
      const today = new Date();
      const time_left =
        found.integrations[0].expiresAt?.getTime()! - today.getTime();

      const days = Math.round(time_left / (1000 * 3600 * 24));
      if (days < 5) {
        // basically we are getting the refresh token time left and if it is less than 5 days we can refresh the token

        const refresh = await refreshToken(found.integrations[0].token);
        const today = new Date();
        const expire_date = today.setDate(today.getDate() + 60);

        const update_token = await updateIntegration(
          found.integrations[0].id,
          refresh.access_token,
          new Date(expire_date)
        );
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("User not found");
  }
};
