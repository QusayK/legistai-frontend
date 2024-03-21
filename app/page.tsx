"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      const { access_token } = response.data;
      Cookies.set("token", access_token);

      toast.success("Logged in successfully!");
      router.push("/pdfs");
    } catch (error: any) {
      const err = error.response?.data.error;

      if (axios.isAxiosError(error) && err) {
        return toast.error(err);
      }

      toast.error("Email or username are incorrect.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col md:flex-row h-screen items-center px-16 py-10 gap-16">
      <div className="left h-full flex flex-col flex-1 lg:pt-20">
        <Image
          className="mb-4"
          src="/legistai_logo.png"
          alt="Legistai logo"
          width={150}
          height={30}
        />
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <h1 className="text-lg font-bold mb-2">
            Enter Your Login Id Password To Access Your Account
          </h1>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold text-sm">Email</label>
            <input
              className="p-3 rounded-lg text-sm outline-none  focus:border-blue-500 border border-solid border-gray-300"
              type="text"
              name="email"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold text-sm">Password</label>
            <input
              className="p-3 rounded-lg text-sm outline-none  focus:border-blue-500 border border-solid border-gray-300"
              type="password"
              name="password"
              placeholder="*****************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="font-semibold ml-auto cursor-pointer text-sm">
              Forgot password
            </p>
          </div>
          <button
            className="w-full flex gap-2 items-center justify-center bg-blue-600 hover:bg-blue-500 rounded-lg text-white p-3"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                Log in <FaLongArrowAltRight />
              </>
            )}
          </button>
        </form>

        <p className="font-semibold mt-20 text-center text-sm flex-grow">
          If You Don&apos;t Have Any Account?{" "}
          <a className="text-blue-600 underline">Create Your Account</a>
        </p>
      </div>
      <div className="right gradient-bg h-full min-h-96 rounded-3xl flex flex-col justify-between text-white px-10 py-16 flex-1">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            Your Personal Task Manager Has Arrived!
          </h1>
          <p className="text-sm">
            Create Your Login Id Password To Access Your Account
          </p>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 h-1 bg-white rounded-2xl"></div>
          <div className="flex-1 h-1 bg-gray-400 bg-opacity-30 rounded-2xl"></div>
          <div className="flex-1 h-1 bg-gray-400 bg-opacity-30 rounded-2xl"></div>
        </div>
      </div>
    </main>
  );
}
