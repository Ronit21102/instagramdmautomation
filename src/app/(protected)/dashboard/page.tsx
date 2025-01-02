import { onBoardUser } from "@/actions/user";
import React from "react";

type Props = {};

const Page = async (props: Props) => {
  const user = await onBoardUser();
  // server action onboard the user
  // then we can redirect to the dashboard to the particular user id dashboard

  return <div>Ye</div>;
};

export default Page;
