"use client";
import { AlignJustify, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleMenuClick = () => {
    setShow(!show);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShow(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="w-full">
      <div className="mx-auto  py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center md:gap-12">
            <Link
              href="/"
              onClick={() => setShow(false)}
              className="bg-white p-2 rounded-full shadow-md "
            >
              <Image src={"/icon.png"} width={40} height={40} alt={"logo"} />
            </Link>
          </div>

          <div
            className={`md:block ${
              show
                ? "block md:hidden absolute top-2 left-1 w-[98%]  bg-gray-800 p-4 rounded-2xl shadow-xl z-10"
                : "hidden"
            }`}
          >
            <nav aria-label="Global">
              <ul className="flex w-full md:w-auto flex-col md:flex-row justify-start  md:justify-evenly items-start md:items-center gap-6 text-sm">
                <Link
                  href="/"
                  className="bg-white p-2 rounded-full shadow-md md:hidden block"
                  onClick={() => setShow(false)}
                >
                  <Image
                    src={"/icon.png"}
                    width={40}
                    height={40}
                    alt={"logo"}
                  />
                </Link>
                <li>
                  <Link
                    className="text-white md:text-gray-800 transition-all  hover:text-gray-800/75"
                    onClick={() => setShow(false)}
                    href="/"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-white md:text-gray-800 transition-all  hover:text-gray-800/75"
                    onClick={() => setShow(false)}
                    href="/about"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-white md:text-gray-800 transition-all  hover:text-gray-800/75"
                    onClick={() => setShow(false)}
                    href="/price"
                  >
                    Price
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-white md:text-gray-800 transition-all  hover:text-gray-800/75"
                    onClick={() => setShow(false)}
                    href="/contact"
                  >
                    Contact
                  </Link>
                </li>

                <Link
                  className="rounded-md md:hidden block w-full text-center text-sm font-medium"
                  href="/login-user"
                  onClick={() => setShow(false)}
                >
                  <Button
                    variant="outline"
                    className="text-black bg-gray-100 shadow w-full"
                  >
                    Login
                  </Button>
                </Link>

                <button
                  onClick={handleMenuClick}
                  className=" md:hidden block text-white mx-2  rounded-md font-semibold text-sm cursor-pointer shadow-md  absolute right-2 top-4"
                >
                  {show ? (
                    <X size={28} strokeWidth={2.5} />
                  ) : (
                    <AlignJustify size={28} strokeWidth={2.5} />
                  )}
                </button>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <Link href="/login-user">
                <Button
                  variant="outline"
                  className="shadow bg-black text-muted hover:bg-gray-800 hover:text-white"
                >
                  Login
                </Button>
              </Link>
            </div>

            <div className="block md:hidden">
              <button
                onClick={handleMenuClick}
                className=" md:hidden block text-white bg-gray-600 p-1 mx-2  rounded-md font-semibold text-sm cursor-pointer shadow-md"
              >
                {show ? (
                  <X size={28} strokeWidth={2.5} />
                ) : (
                  <AlignJustify size={28} strokeWidth={2.5} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
