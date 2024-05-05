"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserTotalAmount } from "@/helper/AmtSlice";
import Checkout from "@/logs/Payment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserAmt = ({ session }) => {
  const [payment, setPayment] = useState(false);
  const dispatch = useDispatch();

  // get user all amount
  useEffect(() => {
    if (session?.user?.id) {
      dispatch(getUserTotalAmount(session?.user?.id));
    }
  }, [dispatch, session?.user?.id]);

  // get user total amount
  const amount = useSelector((state) => state?.amount?.user?.data);
  const domainTotal = amount?.domains?.reduce(
    (total, domain) => total + domain?.price,
    0
  );
  const hostingTotal = amount?.hosting?.reduce(
    (total, hosting) => total + hosting?.price,
    0
  );
  const totalAmount = domainTotal + hostingTotal;

  return (
    <>
      <Card className="sm:col-span-2 w-full sm:min-w-96 text-gray-900 border-gray-400 shadow-md mt-5 md:w-1/2 lg:w-1/3">
        <CardHeader className="pb-3">
          <CardTitle>Total Amount</CardTitle>
          <span className="text-lg font-semibold">
            <span className="text-2xl font-semibold text-green-600">
              ₹ {totalAmount || "0.00"}
            </span>
          </span>
        </CardHeader>
        <CardFooter>
          <Button
            onClick={() => {
              setPayment(true);
              setTimeout(() => {
                setPayment(false);
              }, 500);
            }}
          >
            Pay Now
          </Button>
        </CardFooter>
      </Card>
      <div className="">
        {payment && (
          <Checkout data={{ amount: totalAmount, id: session?.user?.id }} />
        )}
      </div>
    </>
  );
};

export default UserAmt;
