import React from "react";
import Loader from "@/components/global/loader";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Loader state={true} >...Loading</Loader>
    </div>
  );
};

export default Loading;
