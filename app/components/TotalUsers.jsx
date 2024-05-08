"use client";
import { Card } from "@/components/ui/card";
import { getAllUsers } from "@/helper/AnyUser";
import { Users } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TotalUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const users = useSelector((state) => state?.user?.user?.data?.length);
  return (
    <Card
      className="p-5 text-gray-900 border-gray-400 shadow-md mt-5 rounded-lg"
      x-chunk="dashboard-05-chunk-0"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Total Users</h2>
        <div className="flex items-center justify-center space-x-2">
          <Users size={24} />
          <p className="text-2xl font-semibold">{users || 0}</p>
        </div>
      </div>
      <p className="mt-2 text-gray-600">
        Keep track of your growing user base here. The current count reflects
        the total number of registered users.
      </p>
    </Card>
  );
};

export default TotalUsers;
