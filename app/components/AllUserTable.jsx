import React from "react";

const AllUserTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="rounded-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4"></th>
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
              Date
            </th>
            <th scope="col" className="px-3 sm:px-6 py-3">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4"></td>
            <th
              scope="row"
              className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Ritesh Kumar
            </th>
            <td className="px-3 sm:px-6 py-4">test@gmail.com</td>
            <td className="px-3 sm:px-6 py-4">
              <a href="tel:+919876543210">9876543210</a>
            </td>
            <td className="px-3 sm:px-6 py-4">
              <a href="https://example.com" target="_blank" rel="noreferrer">
                example.com
              </a>
            </td>
            <td className="px-3 sm:px-6 py-4">1 Year</td>
            <td className="px-3 sm:px-6 py-4">
              <time dateTime="2021-10-10">10 Oct 2021</time>
            </td>
            <td className="px-3 sm:px-6 py-4">
              <span className="text-green-500">$100</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AllUserTable;
