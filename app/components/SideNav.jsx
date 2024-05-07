"use client";
import Link from "next/link";
import { Home, LogOut, User, UserRoundPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SideNav = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.isAdmin;
  const links = [
    {
      name: "Dashboard",
      icon: Home,
      link: isAdmin ? "/admin-dashboard" : "/dashboard",
    },
    { name: "All Users", icon: Users, link: "/admin-dashboard/all-users" },
    {
      name: "Create User",
      icon: UserRoundPlus,
      link: "/admin-dashboard/create-user",
    },
  ];

  const filteredLinks = isAdmin
    ? links
    : links.filter((link) => link.name === "Dashboard");

  return (
    <div className="border-r text-gray-900 border-gray-400 shadow-md h-screen block md:w-60 sticky top-0">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center justify-center md:justify-normal border-b border-gray-600 px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/dashboard"
            className="flex items-center justify-center md:justify-normal gap-2 font-semibold"
          >
            <User className="h-6 w-6" />
            <span className="md:block  hidden">
              <span className="text-xl">Dash</span>Board
            </span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {filteredLinks?.map((link) => {
              const Icon = link.icon;
              return (
                <TooltipProvider key={link.name}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link
                        href={link.link}
                        className={`flex items-center justify-center md:justify-normal gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-500 text-gray-900 `}
                      >
                        <Icon className="md:h-4 md:w-4 w-5 h-5" />
                        <span className="md:block hidden">{link.name}</span>
                      </Link>
                      <div className="block md:hidden">
                        <TooltipContent side="right">
                          <span className="text-xs">{link.name}</span>
                        </TooltipContent>
                      </div>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-1 md:p-4">
          <Button
            className="flex items-center justify-center gap-1 w-full bg-primary text-white"
            onClick={() => {
              signOut({
                callbackUrl: "/",
              });
              toast.success("Logged out successfully", {
                style: {
                  background: "#333",
                  color: "#fff",
                },
              });
            }}
          >
            <LogOut className="h-4 w-4" />
            <span className="md:block hidden"> Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
