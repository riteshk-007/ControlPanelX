"use client";
import { updateHostingInfo } from "@/helper/UpdateSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const Checkout = ({ data }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setScriptLoaded(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (scriptLoaded) {
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: data?.amount * 100,
        currency: "INR",
        name: "Control panel X",
        description:
          "Control panel X is a platform that helps you to manage your business with ease.",
        image: "/icon.png",
        handler: async function () {
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
            toast.success("Payment Successful");

            // Convert the hostDate and hostId arrays to strings
            const hostDate = data?.hostDate[0];
            const hostId = data?.hostId[0];

            // Convert the hostDate string to a Date object
            const date = new Date(hostDate);
            // Add one year to the date
            date.setFullYear(date.getFullYear() + 1);
            // Convert the Date object back to a string
            const updatedDate = date.toISOString().split("T")[0];

            // Dispatch the updateHostingInfo action with the updated data
            dispatch(
              updateHostingInfo({
                userId: data?.id,
                hostingId: hostId,
                updateData: {
                  purchasedAt: updatedDate,
                },
              })
            );
          } else {
            console.log("Something went wrong");
            toast.error("Payment Failed");
          }
          alert("Payment Successful");
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  }, [scriptLoaded, data, dispatch]);

  return null;
};

export default Checkout;
