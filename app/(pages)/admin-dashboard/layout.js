import SideNav from "@/app/components/SideNav";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div className="w-full flex h-full">
      <SideNav />
      {children}
    </div>
  );
};

export default AdminLayout;
