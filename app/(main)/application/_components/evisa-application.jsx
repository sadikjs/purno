"use client";
//third party library
import Image from "next/image";
import { useForm } from "react-hook-form";
import { registrationValidation } from "@/lib/applicationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
  FormControl,
} from "@/components/ui/form";

//internal module
import Logo from "@/public/assets/logo.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const router = useRouter();

  //function define
  const form = useForm({
    resolver: zodResolver(registrationValidation),
    defaultValues: {
      role: "",
      email: "",
      password: "",
      referenceNumber: "",
      name: "",
      dateOfBirth: "",
      citizenship: "",
      passport: "",
      travelType: "",
      passportIssuDate: "",
      passportExpireDate: "",
      permit: "",
      visaType: "",
      validityVisaForm: "",
      validityVisaTo: "",
      numberOfEntries: "",
      periodOfStay: "",
      invitationParty: "",
      taxPayerNumber: "",
      rightToWork: "",
      dateOfIssue: "",
      picture: "",
    },
  });

  const profileHandleChange = (e) => {
    if (e.target.files) {
      setPicture(e.target.files[0]);
    }
  };

  async function onsubmit(values) {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("role", values.role);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("referenceNumber", values.referenceNumber);
      formData.append("name", values.name);
      formData.append("dateOfBirth", values.dateOfBirth);
      formData.append("citizenship", values.citizenship);
      formData.append("passport", values.passport);
      formData.append("travelType", values.travelType);
      formData.append("passportIssuDate", values.passportIssuDate);
      formData.append("passportExpireDate", values.passportExpireDate);
      formData.append("permit", values.permit);
      formData.append("visaType", values.visaType);
      formData.append("validityVisaForm", values.validityVisaForm);
      formData.append("validityVisaTo", values.validityVisaTo);
      formData.append("numberOfEntries", values.numberOfEntries);
      formData.append("periodOfStay", values.periodOfStay);
      formData.append("invitationParty", values.invitationParty);
      formData.append("taxPayerNumber", values.taxPayerNumber);
      formData.append("rightToWork", values.rightToWork);
      formData.append("dateOfIssue", values.dateOfIssue);
      formData.append("picture", picture);
      const response = await fetch("/api/evisa-register", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        await response.json();
      }
      toast.success("Registration success!");
      router.push("/");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#013082] ">
      <div className="w-4/6 flex flex-col jusity-center items-center bg-white shadow-lg shadow-white-500/50 my-24 py-16">
        <div className="w-5/6 flex flex-row justify-center items-start max-h-[200px] pb-4 gap-x-6 border-b-2 border-slate-500">
          <div className="">
            <Image src={Logo} alt="logo" width="100" height="100" />
          </div>
          <div className="flex flex-col jusity-center items-center text-sm gap-y-1 lg:gap-y-4 lg:text-xl">
            <h1>КЫРГЫЗ РЕСПУБЛИКАСЫНЫН ТЫШКЫ ИШТЕР МИНИСТРЛИГИ</h1>
            <h1>MINISTRY OF FOREIGN AFFAIRS OF THE KYRGYZ REPUBLIC</h1>
            <h2>Бирдиктүү уруксат/Uniform permit</h2>
          </div>
        </div>
        <div className="w-5/6 flex flex-col justify-start items-center py-6">
          <Form {...form}>
            <form
              className="w-full flex flex-col justify-center lg:justify-start gap-y-4 lg:gap-y-8"
              onSubmit={form.handleSubmit(onsubmit)}
            >
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Email:</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password:</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="referenceNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Арыздын номери/Reference number:</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Толук аты-жөнү/Full name:</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="dateOfBirth"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Туулган датасы/Date of birth:</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="citizenship"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Жарандыгы/Citizenship:</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="passport"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Жол жүрүүчү документтин (паспорттун) номери / Number of
                      Travel document (passport):
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="travelType"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Жол жүрүүчү документтин түрү/Type of travel document:
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="passportIssuDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Жол жүрүүчү документтин (паспорттун) берилген датасы/ DATE
                      of issue of the travelling document (passport):
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="passportExpireDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Жол жүрүүчү документтин (паспорттун) бүткөн датасы/ Date
                      of expiry of the travelling document (passport):
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="permit"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Бирдиктүү документтин мөөнөтү / Validity of uniform
                      permit:
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="visaType"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Визанын түрү/Type of visa:</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex  flex-col items-center gap-y-2 lg:flex-row lg:gap-x-4">
                <FormField
                  name="validityVisaForm"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Визанын колдонулуу мөөнөтү/Validity of visa:
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p>to</p>
                <FormField
                  name="validityVisaTo"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Визанын колдонулуу мөөнөтү/Validity of visa:
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="numberOfEntries"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Кирүүлөрдүн саны/Number of entries:</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="periodOfStay"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Жүрүү мөөнөтү/Period of stay(days):</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="invitationParty"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Чакыруучу тарап/Invitation party:</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="taxPayerNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Чакыруу тараптын жеке салык номери/ Inviting party&rsquo;s
                      individual taxpayer number:
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="rightToWork"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Иштөөгө уруксут/The right to work:</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="dateOfIssue"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Берилген датасы/Date of issue:</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Label htmlFor="pic">Passport size Picture:</Label>
                <Input id="pic" type="file" onChange={profileHandleChange} />
              </div>
              <div className="text-center">
                <Button disabled={loading} type="submit">
                  {" "}
                  {loading ? "submitting..." : "submit"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
