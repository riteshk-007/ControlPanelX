import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const LoginUser = ({ session }) => {
  const phone = session?.user?.phone;
  const formattedPhone = phone
    ? `${phone.slice(0, 4)} ${phone.slice(4, 8)} ${phone.slice(8)}`
    : "0000 0000 00";
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
          You are logged in as {session?.user?.email || "user email address"}.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>+91 {formattedPhone}</Button>
      </CardFooter>
    </Card>
  );
};

export default LoginUser;
