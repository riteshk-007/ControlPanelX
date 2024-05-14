"use client";
import { Card } from "@/components/ui/card";
import { getAllUsers } from "@/helper/AnyUser";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SkeletonCard from "./Skeleton";

const NearestDate = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      try {
        dispatch(getAllUsers());
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const users =
    useSelector((state) => (state?.user?.user ? state.user.user.data : [])) ||
    [];

  if (loading) {
    return (
      <div className="flex flex-col gap-3 mt-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard
            key={index}
            className="w-full h-[60px] rounded my-1 bg-gray-400"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const getHostingRenewalDates = () => {
    const today = new Date();
    const hostingRenewalDates = [];

    if (!Array.isArray(users)) {
      console.error("users is not an array:", users);
      console.clear();
      return hostingRenewalDates;
    }

    for (const user of users) {
      for (const hosting of user.hosting) {
        const renewAt = new Date(hosting.renewAt);
        const diffInDays = Math.floor(
          (renewAt.getTime() - today) / (1000 * 60 * 60 * 24)
        );
        hostingRenewalDates.push({ ...hosting, diffInDays, user });
      }
    }

    hostingRenewalDates.sort((a, b) => {
      if (a.diffInDays < b.diffInDays) return -1;
      if (a.diffInDays > b.diffInDays) return 1;
      return 0;
    });

    return hostingRenewalDates;
  };

  const sortedHostingRenewalDates = getHostingRenewalDates();

  const getColor = (diffInDays) => {
    if (diffInDays <= 30)
      return { bgColor: "bg-red-500", textColor: "text-white" };
    if (diffInDays <= 60)
      return { bgColor: "bg-orange-500", textColor: "text-black" };
    if (diffInDays <= 90)
      return { bgColor: "bg-yellow-500", textColor: "text-black" };
    return { bgColor: "bg-white", textColor: "text-gray-900" };
  };

  return (
    <Card
      className=" text-gray-900 border-gray-400 shadow-md mt-5 rounded-lg overflow-x-auto"
      x-chunk="dashboard-05-chunk-0"
    >
      <div className="bg-gray-100 py-4 px-6 rounded-md overflow-x-auto mb-5">
        <h2 className="text-lg font-bold mb-4">Hosting Renewal Dates</h2>
        {sortedHostingRenewalDates.length === 0 ? (
          <p className="text-sm text-gray-600 font-semibold">
            No data available
          </p>
        ) : (
          sortedHostingRenewalDates.map((hosting) => (
            <div
              key={hosting.id}
              className={`py-4 px-6 rounded-md mb-2 shadow-md flex items-center justify-between ${
                getColor(hosting.diffInDays).bgColor
              }`}
            >
              <div>
                <p
                  className={`text-sm ${
                    getColor(hosting.diffInDays).textColor
                  }`}
                >
                  User Name:{" "}
                  <span className="font-semibold">{hosting.user.name}</span>
                </p>
                <p
                  className={`text-sm ${
                    getColor(hosting.diffInDays).textColor
                  }`}
                >
                  Phone:{" "}
                  <span className="font-semibold">{hosting.user.phone}</span>
                </p>
                <p
                  className={`text-sm ${
                    getColor(hosting.diffInDays).textColor
                  }`}
                >
                  Purchased At:{" "}
                  <span className="font-semibold">
                    {new Date(hosting.purchasedAt).toLocaleDateString()}
                  </span>
                </p>
                <p
                  className={`text-sm ${
                    getColor(hosting.diffInDays).textColor
                  }`}
                >
                  Renew At:{" "}
                  <span className="font-semibold">
                    {new Date(hosting.renewAt).toLocaleDateString()}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-semibold ${
                    getColor(hosting.diffInDays).textColor
                  }`}
                >
                  Days until renewal: {hosting.diffInDays}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default NearestDate;
