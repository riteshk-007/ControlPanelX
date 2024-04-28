import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className=" rounded-lg shadow bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <Link href="/" className="bg-white p-2 rounded-full shadow-md ">
              <Image src={"/icon.png"} width={40} height={40} alt={"logo"} />
            </Link>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Control Panel X
            </span>
          </span>
          <ul className="flex flex-wrap justify-center items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline me-4 md:me-6">
                Services
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <Link href="/" className="hover:underline">
            Control Panel X
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
