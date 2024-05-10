// Dashboard Update API Route

import prisma from "@/DB/db.config";
import { NextResponse } from "next/server";

export const PATCH = async (req) => {
  const { userId, dashboardId, updateData } = await req.json();

  try {
    if (!userId || !dashboardId || !updateData) {
      return NextResponse.json({
        message: "User ID, dashboard ID, and update data are required",
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { dashboard: true },
    });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 404,
      });
    }

    const dashboardToUpdate = user.dashboard.find(
      (dashboard) => dashboard.id === dashboardId
    );
    if (!dashboardToUpdate) {
      return NextResponse.json({
        message: "Dashboard not found for the specified user",
        status: 404,
      });
    }

    await prisma.dashboard.update({
      where: { id: dashboardId },
      data: updateData,
    });

    return NextResponse.json({
      status: 200,
      message: "Dashboard updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  }
};
