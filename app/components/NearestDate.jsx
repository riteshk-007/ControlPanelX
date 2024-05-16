"use client";
import { Card } from "@/components/ui/card";
import { getAllUsers } from "@/helper/AnyUser";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SkeletonCard from "./Skeleton";

const NearestDate = ({ users }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

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

  // send message to client
  const sendWhatsAppMessage = (hosting) => {
    const message = generateMessage(hosting);
    const url = `https://api.whatsapp.com/send?phone=${
      hosting.user.phone
    }&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const generateMessage = (hosting) => {
    switch (selectedLanguage) {
      case "Hindi":
        return `सर, आपकी होस्टिंग ${
          hosting.diffInDays
        } दिनों में समाप्त होने वाली है। आपने ${new Date(
          hosting.purchasedAt
        ).toLocaleDateString()} को खरीदी थी और यह ${new Date(
          hosting.renewAt
        ).toLocaleDateString()} को समाप्त होगी। कृपया अपनी होस्टिंग को नवीनीकरण करें ताकि आपकी साइट बिना रुके चलती रहे।`;
      case "Hinglish":
        return `Sir, aapki hosting ${
          hosting.diffInDays
        } dino me samapt hone wali hai. Aapne ${new Date(
          hosting.purchasedAt
        ).toLocaleDateString()} ko kharidi thi aur yeh ${new Date(
          hosting.renewAt
        ).toLocaleDateString()} ko samapt hogi. Kripya apni hosting ko renew karwa le taki aapki site bina ruke chalti rahe.`;
      default:
        return `Sir, your hosting is going to end in ${
          hosting.diffInDays
        } days. You purchased it on ${new Date(
          hosting.purchasedAt
        ).toLocaleDateString()} and it will end on ${new Date(
          hosting.renewAt
        ).toLocaleDateString()}. Please renew your hosting so that your site continues to run without interruption.`;
    }
  };

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

  if (sortedHostingRenewalDates.every((hosting) => hosting.diffInDays > 100)) {
    return (
      <div className="mt-5 w-full">
        <p className="text-gray-900 border-gray-400 bg-white p-5 shadow-md mt-5 rounded-lg text-center font-bold border capitalize">
          No users have less than 100 days until their hosting renewal.
        </p>
      </div>
    );
  }

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
          sortedHostingRenewalDates.map((hosting) => {
            if (hosting.diffInDays > 100) {
              return null; // Skip this user if renewal days are more than 100
            }
            return (
              <div
                key={hosting.id}
                className={`py-4 px-6 rounded-md mb-2 shadow-md gap-5 md:flex items-center justify-between ${
                  getColor(hosting.diffInDays).bgColor
                }`}
              >
                <div>
                  <p
                    className={`text-sm ${
                      getColor(hosting.diffInDays).textColor
                    }`}
                  >
                    Name:{" "}
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
                <div className="md:text-right h-full flex flex-col gap-2 md:items-end mt-5 md:mt-0">
                  <p
                    className={`text-sm font-semibold ${
                      getColor(hosting.diffInDays).textColor
                    }`}
                  >
                    Days until renewal: {hosting.diffInDays}
                  </p>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="md:w-32 py-1 px-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Hinglish">Hinglish</option>
                  </select>
                  <button
                    onClick={() => sendWhatsAppMessage(hosting)}
                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm"
                  >
                    Reminder
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};

export default NearestDate;
