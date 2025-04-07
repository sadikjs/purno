import { Registration } from "@/model/registration";
import dbConnect from "@/service/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const userId = (await params).id;
    await dbConnect();
    const user = await Registration.findById(userId).lean();
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const profileData = {
      ...user,
      dateOfBirth: user.dateOfBirth ? user.dateOfBirth.toISOString() : null,
    };
    return NextResponse.json(profileData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
