import dbConnect from "@/service/dbConnect";
import { Registration } from "@/model/registration";
import { NextResponse } from "next/server";
export const POST = async (req, res) => {
  await dbConnect();
  try {
    const formData = await req.formData();
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
    const editId = formData.get("editId");

    const data = await Registration.findByIdAndUpdate(
      editId,
      {
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
        invitationParty,
        taxPayerNumber,
        rightToWork,
        dateOfIssue,
      },
      { new: true, runValidators: true }
    );
    return NextResponse.json(
      { message: "update successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
