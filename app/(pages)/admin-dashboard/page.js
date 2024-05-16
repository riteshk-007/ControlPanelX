"use client";
import LoginUser from "@/app/components/LoginUser";
import NearestDate from "@/app/components/NearestDate";
import TotalUsers from "@/app/components/TotalUsers";
import TotalUsersAmt from "@/app/components/TotalUsersAmt";
import { useSession } from "next-auth/react";
import React from "react";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const { data: session } = useSession();
  const users =
    useSelector((state) => (state?.user?.user ? state.user.user.data : [])) ||
    [];
  return (
    <div className="w-full p-3 md:p-5 flex flex-col">
      <h1 className="text-xl md:text-3xl font-bold text-center md:text-start">
        Admin Dashboard
      </h1>
      <p className="md:text-lg text-sm text-center md:text-start">
        🎉 Welcome to the User Management Control Panel X 🚀
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <LoginUser session={session} />
        <TotalUsers users={users} />
        <TotalUsersAmt users={users} />
      </div>
      <NearestDate users={users} />
    </div>
  );
};

export default AdminDashboard;
