import prisma from "@/DB/db.config";
import { NextResponse } from "next/server";

export const GET = async (_) => {
  try {
    const user = await prisma.user.findMany({
      where: {
        isAdmin: false,
      },
      include: {
        domains: true,
        hosting: true,
        dashboard: true,
        cpanel: true,
        adminSettings: true,
      },
    });
    if (!user || user.length === 0) {
      return NextResponse.error({ message: "No admin users found" });
    }
    return NextResponse.json({
      status: "success",
      data: user,
      message: "Admin users fetched successfully",
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.error({ message: error.message });
  }
};
