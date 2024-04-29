"use client";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";

const Layout = ({ children }) => {
  const [userLogin] = useState(false);
  return (
    <div>
      {userLogin ? (
        <div>Some other content</div>
      ) : (
        <>
          <Navbar />
          {children} <Footer />
        </>
      )}
    </div>
  );
};

export default Layout;
