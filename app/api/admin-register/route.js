import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import prisma from "@/DB/db.config";

export const POST = async (req) => {
  const { email, password, name, companyName } = await req.json();
  try {
    if (
      [email, password, name, companyName].some((field) => field?.trim() === "")
    ) {
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
    const emailCheck = await prisma.admin.findUnique({
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
    const user = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name,
        companyName,
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
