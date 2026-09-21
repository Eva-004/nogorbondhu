"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from "@heroui/react";

import {
  HiOutlineSparkles,
  HiArrowRight,
} from "react-icons/hi2";

import {
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa6";

import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const AuthorityRegisterPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [invitation, setInvitation] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

  useEffect(() => {
  if (!token) {
    setError("Invitation token is missing");
    setLoading(false);
    return;
  }

  const getInvitation = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/authority-invitations/${token}`);

      const data = await res.json();


      if (!res.ok) {
        throw new Error(data.message || "Invalid invitation");
      }

      setInvitation(data.invitation);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to load invitation");
    } finally {
      setLoading(false);
    }
  };

  getInvitation();
}, [token]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

     const { error } = await authClient.signUp.email({
          name: data.name,
          email: data.email,
          password: data.password,
        });
        if (error) {
      toast.error(error.message || "Account creation failed");
      return;
    }
    
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/authority-invitations/accept`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          email: data.email,
        }),
      }
    );
     const result = await res.json();
    console.log("Created user:", data);
    toast.success("Account creation successful!");
  };

  if (loading) {
    return (
      <section className="bg-[#EBF7F0] min-h-screen w-full flex items-center justify-center px-4">
        <p className="text-sm font-medium text-[#557065]">
          Loading invitation...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#EBF7F0] min-h-screen w-full flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-[#D5EADF] p-8 text-center">
          <h1 className="text-xl font-bold text-red-600">
            Invalid Invitation
          </h1>

          <p className="mt-2 text-sm text-[#557065]">
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#EBF7F0] min-h-screen w-full flex items-center justify-center px-4 pb-12 pt-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-[#D5EADF] p-8 sm:p-10">

        <div className="flex flex-col items-center text-center mb-8">

          <div className="inline-flex items-center gap-2 bg-[#DDF2E4] text-[#0F6848] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <HiOutlineSparkles className="w-4 h-4" />

            <span>Authority Invitation</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-[#11382B] tracking-tight">
            Create Your{" "}
            <span className="text-[#0F6848]">
              Authority Account
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-[#557065] mt-2 font-medium">
            Complete your account setup to access the NagarBondhu authority dashboard
          </p>
        </div>

        <Form
          className="flex flex-col gap-4 w-full"
          onSubmit={onSubmit}
        >

          <TextField
            name="name"
            type="text"
            value={invitation.name}
            isReadOnly
            className="flex flex-col gap-1.5"
          >
            <Label className="text-xs sm:text-sm font-semibold text-[#11382B]">
              Full Name
            </Label>

            <div className="relative flex items-center">
              <FaUser className="absolute left-3.5 text-[#557065] w-4 h-4 z-10" />

              <Input
                className="pl-10 pr-4 py-2.5 bg-[#F1F5F2] border border-[#D5EADF] rounded-xl text-sm w-full text-[#557065] cursor-not-allowed"
              />
            </div>
          </TextField>

          <TextField
            name="email"
            type="email"
            value={invitation.email}
            isReadOnly
            className="flex flex-col gap-1.5"
          >
            <Label className="text-xs sm:text-sm font-semibold text-[#11382B]">
              Email Address
            </Label>

            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-3.5 text-[#557065] w-4 h-4 z-10" />

              <Input
                className="pl-10 pr-4 py-2.5 bg-[#F1F5F2] border border-[#D5EADF] rounded-xl text-sm w-full text-[#557065] cursor-not-allowed"
              />
            </div>
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

          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            validate={(value) => {
              if (!value) {
                return "Please confirm your password";
              }

              return null;
            }}
            className="flex flex-col gap-1.5"
          >
            <Label className="text-xs sm:text-sm font-semibold text-[#11382B]">
              Confirm Password
            </Label>

            <div className="relative flex items-center">
              <FaLock className="absolute left-3.5 text-[#557065] w-4 h-4 z-10" />

              <Input
                placeholder="Confirm your password"
                className="pl-10 pr-4 py-2.5 bg-[#F8FCF9] border border-[#D5EADF] focus:border-[#0F6848] rounded-xl text-sm w-full transition-all"
              />
            </div>

            <FieldError className="text-xs text-red-500 font-medium" />
          </TextField>

          <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 mt-1">

            <div>
              <p className="text-sm font-semibold text-[#0F6848]">
                Authority Head Account
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-600">
                This account is being created through an official NagarBondhu invitation.
                Your invited email address cannot be changed.
              </p>
            </div>

          </div>

          <Button
            type="submit"
            className="w-full bg-[#0F6848] hover:bg-[#0b5037] text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 mt-2"
          >
            <span>Create Authority Account</span>

            <HiArrowRight className="w-4 h-4" />
          </Button>

        </Form>
      </div>
    </section>
  );
};

export default AuthorityRegisterPage;