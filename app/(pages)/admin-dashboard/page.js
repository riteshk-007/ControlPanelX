"use client";
import LoginUser from "@/app/components/LoginUser";
import { useSession } from "next-auth/react";
import React from "react";

const AdminDashboard = () => {
  const { data: session } = useSession();
  return (
    <div className="w-full p-3 md:p-5 flex flex-col">
      <h1 className="text-xl md:text-3xl font-bold text-center md:text-start">
        Admin Dashboard
      </h1>
      <p className="md:text-lg text-sm text-center md:text-start">
        🎉 Welcome to the User Management Control Panel X 🚀
      </p>
      <div className="w-full flex items-center justify-between gap-4 flex-wrap">
        <LoginUser session={session} />
      </div>
    </div>
  );
};

export default AdminDashboard;
