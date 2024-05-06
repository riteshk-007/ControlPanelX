import AllUserTable from "@/app/components/AllUserTable";
import React from "react";

const AllUsers = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 flex-col overflow-hidden">
      <h1 className="text-xl md:text-3xl font-bold text-start md:text-start w-full">
        All Users
      </h1>
      <div className="overflow-x-auto w-full flex items-center justify-center">
        <AllUserTable />
      </div>
    </div>
  );
};

export default AllUsers;
