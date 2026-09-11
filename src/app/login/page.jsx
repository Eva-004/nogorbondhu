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
import { FaLock, FaEnvelope } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const LoginPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = e.target.email.value;
        const password = e.target.password.value;
        const { error } = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/profile",
        })
        if (error) {
            toast.error(error.message || "Login failed");
            return;
        }
        toast.success("Login Successful!")
    };

    const handleGoogleLogin = async () => {
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/profile",
        });

        if (error) {
            toast.error(error.message || "Google login failed");
        }
    }

    return (
        <section className="bg-[#EBF7F0] min-h-screen w-full flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-[#D5EADF] p-8 sm:p-10">

                <div className="flex flex-col items-center text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-[#DDF2E4] text-[#0F6848] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
                        <HiOutlineSparkles className="w-4 h-4 text-[#0F6848]" />
                        <span>Welcome Back</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#11382B] tracking-tight">
                        Login to <span className="text-[#0F6848]">NogorBondhu</span>
                    </h1>

                    <p className="text-xs sm:text-sm text-[#557065] mt-2 font-medium">
                        Enter your credentials to access your account
                    </p>
                </div>

                <Form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>

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
                            if (!value) {
                                return "Password is required";
                            }
                            return null;
                        }}
                        className="flex flex-col gap-1.5"
                    >
                        <div className="flex items-center justify-between">
                            <Label className="text-xs sm:text-sm font-semibold text-[#11382B]">
                                Password
                            </Label>
                            <Link
                                href="/forgot-password"
                                className="text-xs font-semibold text-[#0F6848] hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="relative flex items-center">
                            <FaLock className="absolute left-3.5 text-[#557065] w-4 h-4 z-10" />
                            <Input
                                placeholder="Enter your password"
                                className="pl-10 pr-4 py-2.5 bg-[#F8FCF9] border border-[#D5EADF] focus:border-[#0F6848] rounded-xl text-sm w-full transition-all"
                            />
                        </div>
                        <FieldError className="text-xs text-red-500 font-medium" />
                    </TextField>

                    <Button
                        type="submit"
                        className="w-full bg-[#0F6848] hover:bg-[#0b5037] text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 mt-2"
                    >
                        <span>Sign In</span>
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
                    Don{"'"}t have an account?{" "}
                    <Link href="/register" className="font-semibold text-[#0F6848] hover:underline">
                        Register here
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default LoginPage;