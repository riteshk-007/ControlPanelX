// cPanel Update API Route
import prisma from "@/DB/db.config";
import { NextResponse } from "next/server";

export const PATCH = async (req) => {
  const { userId, cpanelId, updateData } = await req.json();

  try {
    if (!userId || !cpanelId || !updateData) {
      return NextResponse.json({
        message: "User ID, cPanel ID, and update data are required",
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { cpanel: true },
    });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 404,
      });
    }

    const cpanelToUpdate = user.cpanel.find((cpanel) => cpanel.id === cpanelId);

    if (!cpanelToUpdate) {
      return NextResponse.json({
        message: "cPanel not found for the specified user",
        status: 404,
      });
    }

    const updatedCpanel = await prisma.cpanel.update({
      where: { id: cpanelId },
      data: updateData,
    });

    return NextResponse.json({
      status: 200,
      body: updatedCpanel,
      message: "cPanel updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  }
};
