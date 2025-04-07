import dbConnect from "@/service/dbConnect";
import { Registration } from "@/model/registration";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export const POST = async (req, res) => {
  try {
    await dbConnect();
    const formData = await req.formData();
    const role = formData.get("role");
    const email = formData.get("email");
    const password = formData.get("password");
    const referenceNumber = formData.get("referenceNumber");
    const name = formData.get("name");
    const dateOfBirth = formData.get("dateOfBirth");
    const citizenship = formData.get("citizenship");
    const passport = formData.get("passport");
    const travelType = formData.get("travelType");
    const passportIssuDate = formData.get("passportIssuDate");
    const passportExpireDate = formData.get("passportExpireDate");
    const permit = formData.get("permit");
    const visaType = formData.get("visaType");
    const validityVisaForm = formData.get("validityVisaForm");
    const validityVisaTo = formData.get("validityVisaTo");
    const numberOfEntries = formData.get("numberOfEntries");
    const periodOfStay = formData.get("periodOfStay");
    const invitationParty = formData.get("invitationParty");
    const taxPayerNumber = formData.get("taxPayerNumber");
    const rightToWork = formData.get("rightToWork");
    const dateOfIssue = formData.get("dateOfIssue");
    const picture = formData.get("picture");
    //hash password
    const hashPassowrd = await bcrypt.hash(password, 5);

    //uploader
    const uploadDir = "./public/uploads";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // 📌 Save Profile Picture
    const profileExt = path.extname(picture.name);
    const profilePath = `${uploadDir}/profilePictures/${name}_profile${profileExt}`;
    fs.writeFileSync(profilePath, Buffer.from(await picture.arrayBuffer()));
    const upload = await Registration.create({
      role,
      email,
      password: hashPassowrd,
      referenceNumber,
      name,
      dateOfBirth,
      citizenship,
      passport,
      travelType,
      passportIssuDate,
      passportExpireDate,
      permit,
      visaType,
      validityVisaForm,
      validityVisaTo,
      numberOfEntries,
      periodOfStay,
      periodOfStay,
      invitationParty,
      taxPayerNumber,
      rightToWork,
      dateOfIssue,
      picture: `/uploads/profilePictures/${name}_profile${profileExt}`,
    });
    return NextResponse.json(
      { message: "upload successfully", data: upload },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
