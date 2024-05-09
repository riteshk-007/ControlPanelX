// User Update API Route
import prisma from "@/DB/db.config";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export const PATCH = async (req) => {
  const { userId, updateData } = await req.json();

  try {
    if (!userId || !updateData) {
      return NextResponse.json({
        message: "User ID and update data are required",
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 404,
      });
    }

    if (updateData.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: updateData.email },
      });
      if (emailExists && emailExists.id !== userId) {
        return NextResponse.json({
          message: "Email already exists",
          status: 400,
        });
      }
    }

    if (updateData.password) {
      updateData.password = await bcryptjs.hash(updateData.password, 10);
    }
    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json({
      status: 200,
      message: "User updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  }
};
