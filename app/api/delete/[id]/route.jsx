// pages/api/users/[id].js
import dbConnect from "@/service/dbConnect";
import { Registration } from "@/model/registration";
import { NextResponse } from "next/server";
export const DELETE = async (request, { params }) => {
  const id = (await params).id;
  try {
    await dbConnect();
    const deletedUser = await Registration.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ status: 404 }, { error: "User not found" });
    }
    return NextResponse.json(
      { status: 200 },
      { message: "User deleted successfully" }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 500 },
      { error: "Internal Server Error" }
    );
  }
};
