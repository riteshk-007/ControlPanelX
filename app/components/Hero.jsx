import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="py-12 md:py-20 px-4 md:px-8">
      <div className="w-full md:p-5 mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <div className="flex gap-3 items-center mb-6">
            <div className="bg-white rounded-full flex items-center justify-center w-16 h-16">
              <Image
                width={50}
                height={50}
                src="/icon.png"
                alt="Logo"
                className="w-12 h-auto"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Control Panel X</h1>
          </div>
          <p className="text-lg mb-6">
            In this project, we have a super admin, an admin, and users. Users
            can view details of their hosting, domain, or both, including
            expiration dates, and can renew them from the same place.
          </p>
          <p className="text-lg mb-6">
            Users will have access to their website&apos;s admin dashboard link,
            user details such as login ID and password, as well as cPanel links.
            To access cPanel credentials, users need to obtain permission from
            the super admin.
          </p>
          <button className="bg-white text-[#111] px-6 py-3 rounded-md font-semibold">
            Get Started
          </button>
        </div>
        <div className="md:w-1/2 flex items-center justify-center p-2">
          <Image
            width={1200}
            height={1000}
            src="/admin.jpg"
            alt="Admin Panel"
            className="rounded-md w-full h-full object-cover shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
