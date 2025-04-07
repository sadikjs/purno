import { auth } from "@/auth";
import { getUserByEmail } from "@/queries";
import dbConnect from "@/service/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  const session = await auth();
  if (!session?.user) {
    return new NextResponse(`You are not authenticated!`, {
      status: 401,
    });
  }
  await dbConnect();
  try {
    const user = await getUserByEmail(session?.user?.email);
    return NextResponse.json(
      { message: "login successful", user },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ meg: error.message }, { status: 500 });
  }
};
