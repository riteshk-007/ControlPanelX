"use client";
import Link from "next/link";
import {
  Home,
  LineChart,
  LogOut,
  Package,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";
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
  const links = [
    { name: "Dashboard", icon: Home },
    { name: "Orders", icon: ShoppingCart },
    { name: "Products", icon: Package },
    { name: "Customers", icon: Users },
    { name: "Analytics", icon: LineChart },
  ];

  const [activeLink, setActiveLink] = useState(links[0].name);

  console.log(session);

  return (
    <div className=" border-r border-gray-600 bg-black text-white h-screen block md:w-60">
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
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = link.name === activeLink;
              return (
                <TooltipProvider key={link.name}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link
                        href="/dashboard"
                        onClick={() => setActiveLink(link.name)}
                        className={`flex items-center justify-center md:justify-normal gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-500 ${
                          isActive ? "bg-muted text-primary" : "text-gray-200"
                        }`}
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
