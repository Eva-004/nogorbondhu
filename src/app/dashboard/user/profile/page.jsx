"use client"
import { authClient } from "@/lib/auth-client";
import React from "react";
import { FaEdit, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

const Profile = () => {
       const userData = authClient.useSession();
        const user = userData?.data?.user;
        console.log(user);
    return (
        <div className="min-h-screen  px-4 py-8 sm:px-6 lg:px-10">
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#11382B]">My Profile</h1>
                    <p className="text-sm text-[#557065] mt-1">Manage your personal information.</p>
                </div>

                <div className="bg-white border border-[#D5EADF] rounded-2xl overflow-hidden">
                    <div className="h-32 bg-[#0F6848]"></div>

                    <div className="px-5 sm:px-8 pb-8">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14">
                            <div className="flex items-end gap-4">
                                {/* <ProfilePicture image={user?.image} name={user?.name} /> */}

                                <div className="pb-2">
                                    <h2 className="text-xl font-bold text-white">
                                        {user?.name || "Your Name"}
                                    </h2>
                                </div>
                            </div>

                            <button className="flex items-center justify-center gap-2 bg-[#0F6848] hover:bg-[#0b5037] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer">
                                <FaEdit />
                                Edit Profile
                            </button>
                        </div>

                        <div className="mt-7 pt-6 border-t border-[#E4EFE8]">
                            <h3 className="text-base font-bold text-[#11382B] mb-2">About Me</h3>
                            <p className="text-sm text-[#557065] leading-7">
                                {user?.bio || "Add something about yourself."}
                            </p>
                        </div>

                        <div className="mt-7">
                            <h3 className="text-base font-bold text-[#11382B] mb-5">Personal Information</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#EBF7F0] flex items-center justify-center text-[#0F6848]">
                                        <FaEnvelope />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#82958B]">Email Address</p>
                                        <p className="text-sm font-medium text-[#11382B]">{user?.email || "Not provided"}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#EBF7F0] flex items-center justify-center text-[#0F6848]">
                                        <FaPhone />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#82958B]">Phone Number</p>
                                        <p className="text-sm font-medium text-[#11382B]">{user?.phone || "Not provided"}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#EBF7F0] flex items-center justify-center text-[#0F6848]">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#82958B]">Location</p>
                                        <p className="text-sm font-medium text-[#11382B]">{user?.location || "Not provided"}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#EBF7F0] flex items-center justify-center text-[#0F6848]">
                                        <FaCalendarAlt />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#82958B]">Member Since</p>
                                        <p className="text-sm font-medium text-[#11382B]">
                                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "Not available"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
