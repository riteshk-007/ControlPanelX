import { CopyIcon } from "lucide-react";
import React from "react";

const TestUser = () => {
  const AdminInfo = {
    email: "admin@gmail.com",
    password: "password123",
  };
  const UserInfo = {
    email: "user@gmail.com",
    password: "123456",
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <div className="flex flex-col space-y-6 p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <div className="p-4 bg-blue-100 rounded-lg">
        <h2 className="text-base font-semibold text-blue-800">
          Admin Test Account
        </h2>
        <div className="mt-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-900">Email: {AdminInfo.email}</span>
            <CopyIcon
              size={15}
              className="cursor-pointer  text-gray-600 hover:text-gray-900"
              onClick={() => copyToClipboard(AdminInfo.email)}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-900">
              Password: {"*".repeat(AdminInfo.password.length)}
            </span>
            <CopyIcon
              size={15}
              className="cursor-pointer  text-gray-600 hover:text-gray-900"
              onClick={() => copyToClipboard(AdminInfo.password)}
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-green-100 rounded-lg">
        <h2 className="text-base font-semibold text-green-800">
          User Test Account
        </h2>
        <div className="mt-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-900">Login ID: {UserInfo.email}</span>
            <CopyIcon
              size={15}
              className="cursor-pointer  text-gray-600 hover:text-gray-900"
              onClick={() => copyToClipboard(UserInfo.email)}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-900">
              Password: {"*".repeat(UserInfo.password.length)}
            </span>
            <CopyIcon
              size={15}
              className="cursor-pointer  text-gray-600 hover:text-gray-900"
              onClick={() => copyToClipboard(UserInfo.password)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestUser;
