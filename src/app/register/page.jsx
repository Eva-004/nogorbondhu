"use client";

import React from "react";
import Link from "next/link";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button
} from "@heroui/react";
import { HiOutlineSparkles, HiArrowRight } from "react-icons/hi2";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter()
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });
    if (error) {
      toast.error(error.message || "Login failed");
      return;
    }
    toast.success("Register Successfully!");
    router.push("/login")
  };


  const handleGoogleLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard/profile",
    });

    if (error) {
      toast.error(error.message || "Google login failed");
    }
  }

  return (
    <section className="bg-[#EBF7F0] min-h-screen w-full flex items-center justify-center px-4 pb-12 pt-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-[#D5EADF] p-8 sm:p-10">

        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#DDF2E4] text-[#0F6848] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <HiOutlineSparkles className="w-4 h-4 text-[#0F6848]" />
            <span>Join Our Community</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-[#11382B] tracking-tight">
            Create a <span className="text-[#0F6848]">NagarBondhu</span> Account
          </h1>

          <p className="text-xs sm:text-sm text-[#557065] mt-2 font-medium">
            Register to report, track, and improve your local community
          </p>
        </div>

        <Form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>

          <TextField
            isRequired
            name="name"
            type="text"
            validate={(value) => {
              if (!value || value.trim().length < 3) {
                return "Full name must be at least 3 characters";
              }
              return null;
            }}
            className="flex flex-col gap-1.5"
          >
            <Label className="text-xs sm:text-sm font-semibold text-[#11382B]">
              Full Name
            </Label>
            <div className="relative flex items-center">
              <FaUser className="absolute left-3.5 text-[#557065] w-4 h-4 z-10" />
              <Input
                placeholder="John Doe"
                className="pl-10 pr-4 py-2.5 bg-[#F8FCF9] border border-[#D5EADF] focus:border-[#0F6848] rounded-xl text-sm w-full transition-all"
              />
            </div>
            <FieldError className="text-xs text-red-500 font-medium" />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
            className="flex flex-col gap-1.5"
          >
            <Label className="text-xs sm:text-sm font-semibold text-[#11382B]">
              Email Address
            </Label>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-3.5 text-[#557065] w-4 h-4 z-10" />
              <Input
                placeholder="citizen@example.com"
                className="pl-10 pr-4 py-2.5 bg-[#F8FCF9] border border-[#D5EADF] focus:border-[#0F6848] rounded-xl text-sm w-full transition-all"
              />
            </div>
            <FieldError className="text-xs text-red-500 font-medium" />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              return null;
            }}
            className="flex flex-col gap-1.5"
          >
            <Label className="text-xs sm:text-sm font-semibold text-[#11382B]">
              Password
            </Label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-3.5 text-[#557065] w-4 h-4 z-10" />
              <Input
                placeholder="Minimum 8 characters"
                className="pl-10 pr-4 py-2.5 bg-[#F8FCF9] border border-[#D5EADF] focus:border-[#0F6848] rounded-xl text-sm w-full transition-all"
              />
            </div>
            <FieldError className="text-xs text-red-500 font-medium" />
          </TextField>

          <Button
            type="submit"
            className="w-full bg-[#0F6848] hover:bg-[#0b5037] text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 mt-3"
          >
            <span>Create Account</span>
            <HiArrowRight className="w-4 h-4" />
          </Button>

        </Form>
        <div className="relative flex items-center justify-center w-full my-4">
          <div className="border-t border-[#D5EADF] w-full"></div>
          <span className="bg-white px-3 text-xs text-[#557065] font-medium absolute">
            OR
          </span>
        </div>
        <Button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-[#F8FCF9] hover:bg-[#EBF7F0] text-[#11382B] border border-[#D5EADF] font-semibold py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm"
        >
          <FcGoogle className="w-5 h-5" />
          <span className="text-sm">Continue with Google</span>
        </Button>
        <div className="mt-6 text-center text-xs sm:text-sm text-[#557065]">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#0F6848] hover:underline">
            Login here
          </Link>
        </div>

      </div>
    </section>
  );
};

export default RegisterPage;