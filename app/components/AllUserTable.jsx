"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { getAllUsers } from "@/helper/AnyUser";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllUserTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { user, loading } = useSelector((state) => state.user);

  // format date
  function formatDate(date) {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  function formatRenewalDate(date) {
    const renewalDate = new Date(
      date.getFullYear() + 1,
      date.getMonth(),
      date.getDate()
    );
    const options = { month: "long", day: "numeric", year: "numeric" };
    return renewalDate.toLocaleDateString("en-US", options);
  }

  return (
    <div className="overflow-x-auto">
      <table className="rounded-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              No.
            </th>
            <th scope="col" className="px-3 sm:px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-3 sm:px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-3 sm:px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-3 sm:px-6 py-3">
              Domain
            </th>
            <th scope="col" className="px-3 sm:px-6 py-3">
              Hosting
            </th>
            <th scope="col" className="px-3 sm:px-6 py-3">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            <tr>
              <td colSpan="8">
                <Skeleton className="w-full h-[40px] rounded my-1 bg-gray-400" />
                <Skeleton className="w-full h-[40px] rounded my-1 bg-gray-400" />
                <Skeleton className="w-full h-[40px] rounded my-1 bg-gray-400" />
              </td>
            </tr>
          ) : user?.data?.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-4">
                No users found.
              </td>
            </tr>
          ) : (
            user?.data?.map((user, index) => (
              <tr
                key={user?.id}
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">{index + 1}</td>
                <th
                  scope="row"
                  className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user?.name}
                </th>
                <td className="px-3 sm:px-6 py-4">
                  <a href={`mailto:${user?.email}`}>{user?.email}</a>
                </td>
                <td className="px-3 sm:px-6 py-4">
                  <a
                    href={`https://wa.me/${
                      user?.phone
                    }?text=${encodeURIComponent(
                      "Your hosting is about to expire, please renew it."
                    )}`}
                    target="_blank"
                  >
                    <Image
                      src="/whatsapp.png"
                      width={20}
                      height={20}
                      alt={user?.phone}
                    />
                  </a>
                </td>
                <td className="px-3 sm:px-6 py-4">
                  {user?.domains ? (
                    user?.domains?.map((domain) => (
                      <a
                        key={domain?.id}
                        href={`https://who.is/whois/${domain?.name}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {domain?.name}
                      </a>
                    ))
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </td>
                <td className="px-3 sm:px-6 py-4">
                  {user?.hosting ? (
                    user?.hosting?.map((hosting) => (
                      <span key={hosting?.id} className="text-black">
                        <p className="text-red-500">
                          {" "}
                          Join Date:{" "}
                          {formatDate(new Date(hosting?.purchasedAt))}
                        </p>
                        <br />
                        <p className="text-green-500">
                          {" "}
                          Renew Date:{" "}
                          {formatRenewalDate(new Date(hosting?.purchasedAt))}
                        </p>
                      </span>
                    ))
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </td>

                <td className="px-3 sm:px-6 py-4">
                  <span className="text-green-500">
                    ₹
                    {user?.domains?.reduce(
                      (total, domain) => total + domain?.price,
                      0
                    ) +
                      user?.hosting?.reduce(
                        (total, hosting) => total + hosting?.price,
                        0
                      )}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUserTable;
