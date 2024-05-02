"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import React from "react";

const LoginUser = () => {
  const { data: session } = useSession();
  return (
    <Card
      className="sm:col-span-2 bg-black text-white border border-gray-700 w-full sm:min-w-96  mt-5 md:w-1/2 lg:w-1/3"
      x-chunk="dashboard-05-chunk-0"
    >
      <CardHeader className="pb-3">
        <CardTitle>
          Welcome,{" "}
          <span className="font-semibold capitalize">
            {session?.user?.name || "User"}
          </span>
        </CardTitle>
        <CardDescription className="max-w-lg text-gray-300 leading-relaxed gap-2">
          You are logged in as {session?.user?.email}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>+91 {session?.user?.phone.split("5").join(" ")}</Button>
      </CardFooter>
    </Card>
  );
};

export default LoginUser;
