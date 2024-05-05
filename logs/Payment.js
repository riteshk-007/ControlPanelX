"use client";
import { useEffect } from "react";

const Checkout = ({ data }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: data?.amount * 100,
        currency: "INR",
        name: "Control panel X",
        description:
          "Control panel X is a platform that helps you to manage your business with ease.",
        image: "/icon.png",
        handler: async function (response) {
          const res = await fetch("/api/payment", {
            cache: "no-cache",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: data?.id,
              amount: data?.amount,
            }),
          });
          if (res.ok) {
            console.log("User created successfully");
          } else {
            console.log("Something went wrong");
          }
          alert("Payment Successful");
        },
        prefill: {},
        theme: {
          color: "#3e9c35",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };
  }, [data]);

  return null;
};

export default Checkout;
