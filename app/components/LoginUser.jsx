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
      className="text-gray-900 border-gray-400 shadow-md mt-5 "
      x-chunk="dashboard-05-chunk-0"
    >
      <CardHeader className="pb-3">
        <CardTitle>
          Welcome,{" "}
          <span className="font-semibold capitalize">
            {session?.user?.name || "User"}
          </span>
        </CardTitle>
        <CardDescription className="max-w-lg text-gray-800 leading-relaxed gap-2">
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
