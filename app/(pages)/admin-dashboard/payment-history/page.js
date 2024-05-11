"use client";
import { getAllUsersPaymentHistory } from "@/helper/AmtSlice";
import { History } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PaymentHistory = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state?.amount);

  useEffect(() => {
    dispatch(getAllUsersPaymentHistory());
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full items-center overflow-hidden">
      <div className="flex justify-between items-center w-full  bg-white shadow-md">
        <h1 className="text-base md:text-2xl font-semibold p-3 text-gray-800 flex w-full items-center justify-center ">
          <History size={32} className="mr-2" />
          Payment History
        </h1>
      </div>
      <div className="container mx-auto p-4 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-gray-900"></div>
          </div>
        ) : users?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Paid At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(user.paidAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <p className="text-gray-500">No data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
