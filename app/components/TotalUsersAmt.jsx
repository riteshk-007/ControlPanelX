"use client";
import { Card } from "@/components/ui/card";
import { getAllUsers } from "@/helper/AnyUser";
import { IndianRupee } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TotalUsersAmt = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const users =
    useSelector((state) => (state?.user?.user ? state.user.user.data : [])) ||
    [];

  function calculateTotalAmount(users) {
    if (!users || !Array.isArray(users)) {
      console.error("users is not an array or is null/undefined:", users);
      return 0; // Return a default value or handle the error as needed
    }
    let totalAmount = 0;

    for (const user of users) {
      // Calculate total for domains
      const domainPrices = user?.domains?.map((domain) => domain?.price);
      const totalDomainPrice = domainPrices?.reduce(
        (sum, price) => sum + price,
        0
      );

      // Calculate total for hosting
      const hostingPrices = user?.hosting?.map((host) => host?.price);
      const totalHostingPrice = hostingPrices?.reduce(
        (sum, price) => sum + price,
        0
      );

      // Add user's total to overall total
      totalAmount += totalDomainPrice + totalHostingPrice;
    }

    return totalAmount;
  }

  const totalAmount = calculateTotalAmount(users);

  return (
    <Card
      className="p-5 text-gray-900 border-gray-400 shadow-md mt-5 rounded-lg"
      x-chunk="dashboard-05-chunk-0"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Total Users Amount:</h2>
        <div className="flex items-center justify-center space-x-2">
          <IndianRupee size={24} />
          <span className="text-xl font-semibold">{totalAmount}</span>
        </div>
      </div>
      <p className="mt-2 text-gray-600">
        Total amount of all users in the system.
      </p>
    </Card>
  );
};

export default TotalUsersAmt;
