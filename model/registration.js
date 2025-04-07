import mongoose, { Schema } from "mongoose";
const registrationSchema = new Schema({
  role: {
    type: String,
    default: "user",
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  referenceNumber: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  citizenship: {
    type: String,
    required: true,
  },
  passport: {
    type: String,
    required: true,
  },
  travelType: {
    type: String,
    required: true,
  },
  passportIssuDate: {
    type: Date,
  },
  passportExpireDate: {
    type: Date,
  },
  permit: {
    type: Date,
  },
  visaType: {
    type: String,
    required: true,
  },
  validityVisaForm: {
    type: Date,
  },
  validityVisaTo: {
    type: Date,
  },
  numberOfEntries: {
    type: String,
  },
  periodOfStay: {
    type: String,
  },
  invitationParty: {
    type: String,
  },
  taxPayerNumber: {
    type: String,
  },
  rightToWork: {
    type: String,
  },
  dateOfIssue: {
    type: Date,
  },
  picture: {
    type: String,
  },
  createdOn: {
    default: Date.now(),
    type: Date,
  },
  modifiedOn: {
    default: Date.now(),
    type: Date,
  },
});
export const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);
