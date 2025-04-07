"use client";
import { useState } from "react";
import { loginCredentials } from "@/app/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const response = await loginCredentials(formData);
      if (!!response.error) {
        setError(response.error);
      } else {
        console.log("user front", response);
        router.push("/");
      }
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="w-80 h-96 flex flex-col justify-center items-center bg-white gap-y-4 p-2 shadow shadow-md rounded">
        <span className="font-bold underline text-md">Login Form</span>
        <form
          className="flex flex-col justify-start items-start"
          onSubmit={handleSubmit}
        >
          <label>Email Id:</label>
          <input
            type="text"
            className="border border-slate-300 pb-1 mb-4"
            name="email"
            placeholder="Enter your email..."
            required
          />

          <label>Password:</label>
          <input
            type="text"
            name="password"
            className="border border-slate-300 p-1 mb-4"
            placeholder="Enter your password..."
            required
          />
          <button className="bg-stone-500 px-4 py-1 m-auto" type="submit">
            Login
          </button>
        </form>
        {error && (
          <span style={{ color: "red", marginTop: "10px" }}>
            Something went wrong!
          </span>
        )}
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <p>
            <Link href="/" className="underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
