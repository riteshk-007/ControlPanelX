"use client";
import LoginUser from "@/app/components/LoginUser";
import UserAmt from "@/app/components/UserAmt";
import UserInfo from "@/app/components/UserInfo";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full p-3 md:p-5 flex flex-col">
      <h1 className="text-xl md:text-3xl font-bold text-center md:text-start">
        Dashboard
      </h1>
      <p className="md:text-lg text-sm text-center md:text-start">
        🎉 Welcome to the User Management Control Panel X 🚀
      </p>
      <div className="w-full flex items-center justify-between gap-4 flex-wrap">
        <LoginUser session={session} />
        <UserAmt session={session} />
      </div>
      <UserInfo session={session} />
    </div>
  );
};

export default Dashboard;
