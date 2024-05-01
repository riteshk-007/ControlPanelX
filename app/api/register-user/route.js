import prisma from "@/DB/db.config";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export const POST = async (req) => {
  const { name, phone, email, password, data = {} } = await req.json();
  try {
    if ([name, phone, email, password].some((field) => field?.trim() === "")) {
      return NextResponse.json({
        message: "Please fill all the fields",
        status: 400,
      });
    }
    if (password.length < 6) {
      return NextResponse.json({
        message: "Password should be minimum 6 characters",
        status: 400,
      });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const emailCheck = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (emailCheck) {
      return NextResponse.json({
        message: "Email already exists",
        status: 400,
      });
    }
    const user = await prisma.user.create({
      data: {
        name,
        phone,
        email,
        password: hashedPassword,
        data,
      },
    });
    return NextResponse.json({
      status: 200,
      body: user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  }
};
