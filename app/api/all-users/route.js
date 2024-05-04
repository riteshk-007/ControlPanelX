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
        cpanel: {
          select: {
            id: true,
            userId: true,
            cpanelId: true,
          },
        },
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
export const POST = async (req) => {
  try {
    const { id } = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        domains: {
          select: {
            price: true,
          },
        },
        hosting: {
          select: {
            price: true,
          },
        },
      },
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({
      status: 200,
      data: user,
      message: "User Total Amount found",
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
