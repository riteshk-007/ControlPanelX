import LoginUser from "@/app/components/LoginUser";
import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full p-3 md:p-5 flex flex-col">
      <h1 className="text-xl md:text-3xl font-bold text-center md:text-start">
        Dashboard
      </h1>
      <p className="md:text-lg text-sm text-center md:text-start">
        🎉 Welcome to the User Management Control Panel X 🚀
      </p>
      <LoginUser />
    </div>
  );
};

export default Dashboard;
