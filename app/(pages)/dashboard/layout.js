import SideNav from "@/app/components/SideNav";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="w-full flex h-full">
      <SideNav />
      {children}
    </div>
  );
};

export default DashboardLayout;
