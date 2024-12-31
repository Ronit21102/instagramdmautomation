import Infobar from "@/components/global/infobar";
import Sidebar from "@/components/global/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

const Layout = ({ children, params }: Props) => {
  //QUery
  // const { data, error, loading } = useQuery(QUERY, {

  return (
    <div className="p-3">
      {/**sidebar */}
      <Sidebar slug={params.slug} />
      {/*Navbar */}
      <div
        className="
      lg:ml-[250px] 
      lg:pl-10 
      lg:py-5 
      flex 
      flex-col 
      overflow-auto
      "
      >
        <Infobar slug={params.slug} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
