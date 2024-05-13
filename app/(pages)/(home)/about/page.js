import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div class="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      <div class="lg:w-10/12 w-full">
        <p class="font-normal text-sm leading-3 text-indigo-700 dark:text-indigo-500 hover:text-indigo-800 cursor-pointer">
          About
        </p>
        <h2 class="xl:w-8/12 lg:w-10/12 w-full font-bold text-gray-800 dark:text-white lg:text-4xl text-3xl lg:leading-10 leading-9 mt-2">
          Control Panel X
        </h2>
        <p class="font-normal text-base leading-6 text-gray-600 dark:text-white mt-6">
          In this project, we have a super admin, an admin, and users. Users can
          view details of their hosting, domain, or both, including expiration
          dates, and can renew them from the same place.
        </p>
        <p class="font-normal text-base leading-6 text-gray-600 dark:text-white mt-6">
          Users will have access to their website&apos;s admin dashboard link,
          user details such as login ID and password, as well as cPanel links.
          To access cPanel credentials, users need to obtain permission from the
          super admin.
        </p>
      </div>

      <div class="lg:mt-14 sm:mt-10 mt-12">
        <Image
          width={1500}
          height={1500}
          class=" rounded-md w-full"
          src="/ab1.jpg"
          alt="About Image"
        />
      </div>

      <div class="lg:mt-16 sm:mt-12 mt-16 flex lg:flex-row justify-between flex-col lg:gap-8 gap-12">
        <div class="w-full xl:w-5/12 lg:w-6/12">
          <h2 class="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 dark:text-white">
            Our Story
          </h2>
          <p class="font-normal text-base leading-6 text-gray-600 dark:text-white mt-4">
            Control Panel X is a project designed to simplify the management of
            hosting and domain details for users. With a hierarchy of super
            admin, admin, and users, it ensures smooth operation and secure
            access to sensitive information.
          </p>
          <p class="font-normal text-base leading-6 text-gray-600 dark:text-white mt-6">
            Users have the convenience of viewing and renewing their hosting and
            domain details from a single place. They also have access to their
            website&apos;s admin dashboard link, login ID, password, and cPanel
            links. However, access to cPanel credentials requires permission
            from the super admin, ensuring an added layer of security.
          </p>
        </div>
        <div class="lg:flex items-center w-full lg:w-1/2">
          <Image
            width={1500}
            height={1500}
            src="/ab2.jpg"
            alt="Our Story Image"
            class="rounded-md w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
