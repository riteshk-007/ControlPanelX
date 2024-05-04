import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserTotalAmount } from "@/helper/AmtSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserAmt = ({ session }) => {
  const dispatch = useDispatch();

  // get user all amount
  useEffect(() => {
    dispatch(getUserTotalAmount(session?.user?.id));
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
    <Card className="sm:col-span-2 bg-black text-white border border-gray-700 w-full sm:min-w-96  mt-5 md:w-1/2 lg:w-1/3">
      <CardHeader className="pb-3">
        <CardTitle>Total Amount</CardTitle>
        <CardDescription className="max-w-lg text-gray-300 leading-relaxed gap-2">
          <div className="text-lg font-semibold">
            <span className="text-2xl font-semibold text-green-500">
              ₹ {totalAmount || "0.00"}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          onClick={() => {
            alert("Payment Successfull");
          }}
        >
          Pay Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserAmt;
