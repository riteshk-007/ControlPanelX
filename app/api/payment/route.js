import prisma from "@/DB/db.config";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { id, amount } = await req.json();
  if (!id || !amount) {
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  }
  try {
    const pay = await prisma.payment.create({
      data: {
        userId: id,
        amount: amount,
      },
    });
    if (pay) {
      return NextResponse.json(
        { message: "Payment successful" },
        { status: 200 }
      );
    }
    return NextResponse.json({ message: "Payment failed" }, { status: 400 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const GET = async (_) => {
  try {
    const payments = await prisma.payment.findMany();
    if (!payments) {
      return NextResponse.json(
        { message: "No payments found" },
        { status: 404 }
      );
    }
    return NextResponse.json(payments, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
