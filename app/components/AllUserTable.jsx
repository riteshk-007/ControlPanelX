"use client";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllUsers } from "@/helper/AnyUser";
import { MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllUserTable = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { user, loading } = useSelector((state) => state.user);

  // format date
  function formatDate(date) {
    const options = { month: "numeric", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  function formatRenewalDate(date) {
    const renewalDate = new Date(
      date.getFullYear() + 1,
      date.getMonth(),
      date.getDate()
    );
    const options = { month: "numeric", day: "numeric", year: "numeric" };
    return renewalDate.toLocaleDateString("en-US", options);
  }

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  // Calculate the start and end indexes for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the data for the current page
  var currentPageData = Array.isArray(user?.data)
    ? user?.data?.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render pagination numbers
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (
      let i = 1;
      i <= Math.ceil((user?.data?.length || 0) / itemsPerPage);
      i++
    ) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-3 py-1 mx-1 rounded select-none ${
            currentPage === i ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };
  // Update the search input
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  // Filter the user data based on the search input
  const filteredUsers = Array.isArray(user?.data)
    ? user?.data?.filter((user) => {
        return (
          user.name.toUpperCase().includes(search.toUpperCase()) ||
          user.email.toUpperCase().includes(search.toUpperCase())
        );
      })
    : [];
  // Use the filtered data for the current page
  var currentPageData = filteredUsers?.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="overflow-x-auto w-full mt-5 rounded-md shadow-2xl">
      <label
        htmlFor="search"
        className="md:flex items-center justify-center w-full md:w-1/2 my-3 md:mx-1"
      >
        <span className="mr-2">Search:</span>
        <Input
          type="text"
          id="myInput"
          placeholder="Search for names, emails..."
          value={search}
          onChange={handleSearchChange}
          className="md:my-0 my-2"
        />
      </label>
      <table className="rounded-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-full">
        <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
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
            <th scope="col" className="px-3 sm:px-6 py-3">
              Profile
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            <tr>
              <td colSpan="8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="w-full h-[60px] rounded my-1 bg-gray-400"
                  />
                ))}
              </td>
            </tr>
          ) : user?.data?.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-4">
                No users found.
              </td>
            </tr>
          ) : (
            Array.isArray(user?.data) &&
            currentPageData?.map((user, index) => (
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
                        <span className="text-[#FF6347]">
                          {" "}
                          <p className="hidden lg:block">Join Date: </p>
                          {formatDate(new Date(hosting?.purchasedAt))}
                        </span>
                        <br />
                        <span className="text-[#4169E1]">
                          {" "}
                          <p className="hidden lg:block">Renew Date: </p>
                          {formatRenewalDate(new Date(hosting?.purchasedAt))}
                        </span>
                      </span>
                    ))
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </td>

                <td className="px-3 sm:px-6 py-4">
                  <span className="font-bold">
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
                <td className="px-3 sm:px-6 py-4">
                  <Link
                    href={`/admin-dashboard/all-users/${user?.id}`}
                    className=" bg-[#0b1534] text-white p-2  text-sm rounded hover:bg-[#0b1534] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0b1534] focus:ring-opacity-50"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Render pagination */}
      <div className="flex justify-center mt-4 select-none">
        {currentPage !== 1 && (
          <button
            className="px-3 py-1 mx-1 rounded bg-gray-900 text-white hover:bg-gray-800"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <MoveLeft />
          </button>
        )}
        {renderPageNumbers()}
        {currentPage !==
          Math.ceil((user?.data?.length || 0) / itemsPerPage) && (
          <button
            className="px-3 py-1 mx-1 rounded bg-gray-900 text-white hover:bg-gray-800"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <MoveRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default AllUserTable;
