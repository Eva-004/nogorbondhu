
import React from "react";
import Image from "next/image";
import { HiOutlineCamera } from "react-icons/hi2";

const ProfilePicture = ({ image, name }) => {
    return (
        <div className="w-28 h-28 rounded-2xl bg-[#DDF2E4] border-4 border-white flex items-center justify-center relative overflow-hidden">
            {image ? (
                <Image
                    src={image}
                    alt={name || "Profile"}
                    fill
                    className="object-cover"
                    unoptimized
                />
            ) : (
                <span className="text-4xl font-bold text-[#0F6848]">
                    {name?.charAt(0)?.toUpperCase() || "U"}
                </span>
            )}

            <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#0F6848] hover:bg-[#0b5037] text-white flex items-center justify-center border-2 border-white cursor-pointer">
                <HiOutlineCamera size={17} />
            </button>
        </div>
    );
};

export default ProfilePicture;
