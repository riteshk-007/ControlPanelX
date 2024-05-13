import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import React from "react";

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
