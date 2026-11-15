
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { HiOutlineCamera } from "react-icons/hi2";
import { toast } from "react-toastify";

const ProfilePicture = ({ image, name, onImageChange }) => {
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(image || "");
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        setPreview(image || "");
    }, [image]);

    const uploadImage = async (file) => {
        const body = new FormData();
        body.append("image", file);

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/upload-image`, {
            method: "POST",
            body,
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Upload failed");

        return data.url;
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image");
            return;
        }

        try {
            setUploading(true);

            const imageUrl = await uploadImage(file);
            await onImageChange?.(imageUrl);

            setPreview(imageUrl);
            toast.success("Profile picture updated successfully!");
        } catch (error) {
            toast.error(error.message || "Failed to update profile picture");
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    return (
        <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-[#DDF2E4]">
            {preview ? (
                <Image src={preview} alt={name || "Profile"} fill className="object-cover" unoptimized />
            ) : (
                <span className="text-4xl font-bold text-[#0F6848]">
                    {name?.charAt(0)?.toUpperCase() || "U"}
                </span>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
            />

            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute bottom-1 right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#0F6848] text-white transition hover:bg-[#0b5037] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {uploading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                    <HiOutlineCamera size={17} />
                )}
            </button>
        </div>
    );
};

export default ProfilePicture;
