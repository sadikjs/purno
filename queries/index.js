import mongoose from "mongoose";
import { Registration } from "@/model/registration";
import dbConnect from "@/service/dbConnect";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/mongoIdToString";

export const getApplication = async () => {
  await dbConnect();
  try {
    const allData = await Registration.find().lean();
    return replaceMongoIdInArray(allData);
  } catch (error) {
    throw new Error(error);
  }
};

export const getSingleApplication = async (user) => {
  try {
    const singleData = await Registration.findById(user)
      .select({
        picture: 0,
        createdOn: 0,
        modifiedOn: 0,
      })
      .lean();
    return replaceMongoIdInObject(singleData);
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserByEmail = async (email) => {
  const user = await Registration.findOne({ email: email }).lean();
  return replaceMongoIdInObject(user);
};
