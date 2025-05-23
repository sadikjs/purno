"use client";
import Image from "next/image";
import { format } from "date-fns";
import { useEffect, useState, useRef } from "react";
import Logo from "@/public/assets/logo.png";
//font
import { Inter } from "next/font/google";
import Link from "next/link";

// Load Inter font with specific options
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Customize weights
  variable: "--font-inter", // Define a CSS variable for easy use
  display: "swap", // Ensures a smooth loading experience
});

const Profile = ({ id }) => {
  const buttonRef = useRef(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/profile/${id}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData?.message || `HTTP error! status: ${res.status}`
          );
        }
        const userData = await res.json();
        setData(userData); // Set the ISO string to state
      } catch (err) {
        console.log("Error fetching user:", err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchUser();
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }
  return (
    <>
      <div
        className={`${inter.className} w-full flex flex-col justify-center items-center py-6 bg-[#013082]`}
      >
        <div className="w-4/5 flex flex-col justify-center items-center bg-white my-20 p-12">
          <div className="w-[90%] flex flex-row justify-between items-start pb-6 gap-x-2 border-b-2 border-slate-700">
            <div className="w-1/6 pl-2">
              <Image src={Logo} alt="logo" width={100} height={100} />
            </div>
            <div className="w-5/6 flex flex-col gap-y-4 jusity-start items-center">
              <h1
                style={{ fontFamily: "Times New Roman, serif" }}
                className="text-sm font-medium lg:text-md lg:font-bold"
              >
                КЫРГЫЗ РЕСПУБЛИКАСЫНЫН ТЫШКЫ ИШТЕР МИНИСТРЛИГИ
              </h1>
              <h1
                style={{ fontFamily: "Times New Roman, serif" }}
                className="text-sm font-medium lg:text-md lg:font-bold"
              >
                MINISTRY OF FOREIGN AFFAIRS OF THE KYRGYZ REPUBLIC
              </h1>
              <h2
                style={{ fontFamily: "Times New Roman, serif" }}
                className="font-normal lg:font-semibold text-sm lg:text-md"
              >
                Бирдиктүү уруксат/Uniform permit
              </h2>
            </div>
          </div>
          <table className="w-[90%] flex flex-col gap-y-4 pt-6">
            <thead>
              <tr className="flex flex-row justify-between items-start">
                <td>
                  <Image
                    className="border border-gray-300 w-[100px] h-[130px]"
                    src={data.picture}
                    alt="profile picture "
                    width={100}
                    height={130}
                  />
                </td>
                <td className="flex flex-col justify-end items-end">
                  <p style={{ ontFamily: "Times New Roman, serif" }}>
                    Арыздын номери/Reference number {data.referenceNumber}
                  </p>
                  <Image
                    className="pr-3"
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://evisa-egov-kg.online/profile/${data._id}`}
                    width={100}
                    height={100}
                    alt="qrcode"
                  />
                </td>
              </tr>
            </thead>
            <tbody
              style={{ fontFamily: "Times New Roman, serif" }}
              className="flex flex-col"
            >
              <tr className="w-full flex flex-row justify-start items-start gap-x-4">
                <td className="w-1/2">Толук аты-жөнү/Full name:</td>
                <td className="w-1/2">{data.name}</td>
              </tr>
              <tr className="flex flex-row justify-start items-start gap-x-4">
                <td className="w-1/2">Туулган датасы/Date of birth:</td>
                <td className="w-1/2">
                  {data.dateOfBirth
                    ? format(new Date(data.dateOfBirth), "dd-MM-yyyy")
                    : null}
                </td>
              </tr>
              <tr className="flex flex-row justify-start items-start gap-x-4">
                <td className="w-1/2">Жарандыгы/Citizenship:</td>
                <td className="w-1/2">{data.citizenship}</td>
              </tr>
              <tr className="flex flex-row justify-start items-end gap-x-4">
                <td className="w-1/2">
                  Жол жүрүүчү документтин (паспорттун) номери / Number of Travel
                  document (passport):
                </td>
                <td className="w-1/2">{data.passport}</td>
              </tr>
              <tr className="flex flex-row justify-start items-end gap-x-4">
                <td className="w-1/2">
                  Жол жүрүүчү документтин түрү/Type of travel document:
                </td>
                <td className="w-1/2">{data.travelType}</td>
              </tr>
              <tr className="flex flex-row justify-start items-end gap-x-4">
                <td className="w-1/2">
                  Жол жүрүүчү документтин (паспорттун) берилген датасы/ DATE of
                  issue of the travelling document (passport):
                </td>
                <td className="w-1/2">
                  {data.passportIssuDate
                    ? format(new Date(data.passportIssuDate), "dd-MM-yyyy")
                    : "null"}
                </td>
              </tr>
              <tr className="flex flex-row justify-start items-end gap-x-4">
                <td className="w-1/2">
                  Жол жүрүүчү документтин (паспорттун) бүткөн датасы/ Date of
                  expiry of the travelling document (passport):
                </td>
                <td className="w-1/2">
                  {data.passportExpireDate
                    ? format(new Date(data.passportExpireDate), "dd-MM-yyyy")
                    : "null"}
                </td>
              </tr>
              <tr className="flex flex-row justify-start items-end gap-x-4">
                <td className="w-1/2">
                  Бирдиктүү документтин мөөнөтү / Validity of uniform permit:
                </td>
                <td className="w-1/2">
                  {data.permit
                    ? format(new Date(data.permit), "dd-MM-yyyy")
                    : "null"}
                </td>
              </tr>
              <tr className="flex flex-row justify-start items-start gap-x-4">
                <td className="w-1/2">Визанын түрү/Type of visa:</td>
                <td className="w-1/2">{data.visaType}</td>
              </tr>
              <tr className="flex flex-row justify-start items-start gap-x-4">
                <td className="w-1/2">
                  Визанын колдонулуу мөөнөтү/Validity of visa:
                </td>
                <td className="w-1/2 flex flex-row justify-start items-start gap-x-2">
                  <div className="">
                    {data.validityVisaTo
                      ? format(new Date(data.validityVisaTo), "dd-MM-yyyy")
                      : "null"}
                  </div>
                  <p>-</p>
                  <div className="">
                    {data.validityVisaForm
                      ? format(new Date(data.validityVisaForm), "dd-MM-yyyy")
                      : "null"}
                  </div>
                </td>
              </tr>
              <tr className="flex flex-row justify-start items-start gap-x-4">
                <td className="w-1/2">Кирүүлөрдүн саны/Number of entries:</td>
                <td className="w-1/2">{data.numberOfEntries}</td>
              </tr>
              <tr className="flex flex-row justify-start items-start gap-x-4">
                <td className="w-1/2">Жүрүү мөөнөтү/Period of stay(days):</td>
                <td className="w-1/2">{data.periodOfStay}</td>
              </tr>
              <tr className="flex flex-row justify-start items-start gap-x-4">
                <td className="w-1/2">Чакыруучу тарап/Invitation party:</td>
                <td className="w-1/2">{data.invitationParty}</td>
              </tr>
              <tr className="flex flex-row justify-start items-end gap-x-4">
                <td className="w-1/2">
                  Чакыруу тараптын жеке салык номери/ Inviting party&rsquo;s
                  individual taxpayer number:
                </td>
                <td className="w-1/2">
                  <Link className="text-[#2247ee] underline" href="/">
                    {data.taxPayerNumber}
                  </Link>
                </td>
              </tr>
              <tr className="flex flex-row justify-start items-start gap-x-4">
                <td className="w-1/2">Иштөөгө уруксут/The right to work:</td>
                <td className="w-1/2">{data.rightToWork}</td>
              </tr>
              <tr className="flex flex-row justify-start items-start gap-x-4">
                <td className="w-1/2">Берилген датасы/Date of issue:</td>
                <td className="w-1/2">
                  {data.dateOfIssue
                    ? format(new Date(data.dateOfIssue), "dd-MM-yyyy")
                    : "null"}
                </td>
              </tr>
            </tbody>
            <tbody style={{ fontFamily: "Times New Roman, serif" }}>
              <tr>
                <td className="text-center text-md font-semibold leading-5">
                  Validity period of a visa is generally longer than period of
                  stay. The validity period establishes the first and last dates
                  during which the visa can be used. Period of stay indicates
                  the length of time you have permission to remain in Kyrgyzstan
                  within the validity period of the visa.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Profile;
