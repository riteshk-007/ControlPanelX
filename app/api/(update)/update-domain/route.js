// Domain Update API Route
import prisma from "@/DB/db.config";
import { NextResponse } from "next/server";

export const PATCH = async (req) => {
  const { userId, domainId, updateData } = await req.json();

  try {
    if (!userId || !domainId || !updateData) {
      return NextResponse.json({
        message: "User ID, domain ID, and update data are required",
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { domains: true },
    });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 404,
      });
    }

    const domainToUpdate = user.domains.find(
      (domain) => domain.id === domainId
    );

    if (!domainToUpdate) {
      return NextResponse.json({
        message: "Domain not found for the specified user",
        status: 404,
      });
    }

    await prisma.domain.update({
      where: { id: domainId },
      data: updateData,
    });

    return NextResponse.json({
      status: 200,
      message: "Domain updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  }
};
