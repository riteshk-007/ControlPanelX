// Hosting Update API Route
import prisma from "@/DB/db.config";
import { NextResponse } from "next/server";

export const PATCH = async (req) => {
  const { userId, hostingId, updateData } = await req.json();

  try {
    if (!userId || !hostingId || !updateData) {
      return NextResponse.json({
        message: "User ID, hosting ID, and update data are required",
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { hosting: true },
    });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 404,
      });
    }

    const hostingToUpdate = user.hosting.find(
      (hosting) => hosting.id === hostingId
    );

    if (!hostingToUpdate) {
      return NextResponse.json({
        message: "Hosting not found for the specified user",
        status: 404,
      });
    }

    await prisma.hosting.update({
      where: { id: hostingId },
      data: updateData,
    });

    return NextResponse.json({
      status: 200,
      message: "Hosting updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  }
};
