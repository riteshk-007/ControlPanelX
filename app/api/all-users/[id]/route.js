import prisma from "@/DB/db.config";
import { NextResponse } from "next/server";

export const GET = async (_, { params }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
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
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({
      status: 200,
      data: user,
      message: "User found",
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
