"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, Button, Spinner } from "@heroui/react";
import { HiOutlineMail, HiOutlineUser, HiOutlineShieldCheck } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function InvitationPage({ params }) {
  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
  const verifyInvitation = async () => {
    try {
      const { token } = await params;

      const res = await fetch(
        `http://localhost:5000/authority-invitations/${token}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setInvitation(data.invitation);
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  verifyInvitation();
}, [params]);
const handleAccept = async () => {
  const { token } = await params;

  router.push(`/authority/invite/register?token=${token}`);
};

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F8F6] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-2">
          <Spinner size="xl" />
          <span className="text-xs text-[#0F6848]">Checking invitation...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F8F6] flex items-center justify-center px-4">
        <Card className="w-full max-w-md border border-red-100 shadow-sm">
          <div className="py-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <HiOutlineMail className="text-2xl text-red-500" />
            </div>

            <h1 className="text-xl font-semibold text-gray-800">
              Invitation Not Available
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {error}
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8F6] flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-lg border border-gray-200 shadow-md">
        <div className="p-8 sm:p-10">

          <div className="flex justify-center mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E6F3ED]">
              <HiOutlineShieldCheck className="text-3xl text-[#0F6848]" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#12372A]">
              You&apos;re Invited!
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              You have been invited to join NagarBondhu as an authority member.
            </p>
          </div>

          <div className="mt-8 space-y-3">

            <div className="flex items-center gap-4 rounded-xl bg-[#F8FAF9] border border-gray-100 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E6F3ED]">
                <HiOutlineUser className="text-xl text-[#0F6848]" />
              </div>

              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="mt-0.5 font-medium text-gray-800">
                  {invitation.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-[#F8FAF9] border border-gray-100 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E6F3ED]">
                <HiOutlineMail className="text-xl text-[#0F6848]" />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-500">Email</p>
                <p className="mt-0.5 font-medium text-gray-800 break-all">
                  {invitation.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-[#F8FAF9] border border-gray-100 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E6F3ED]">
                <HiOutlineShieldCheck className="text-xl text-[#0F6848]" />
              </div>

              <div>
                <p className="text-xs text-gray-500">Role</p>
                <p className="mt-0.5 font-medium text-gray-800 capitalize">
                  {invitation.role?.replace("_", " ")}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button onClick={handleAccept}
              size="lg"
              className="w-full bg-[#0F6848] text-white font-semibold hover:bg-[#0B563B]"
            >
              Accept Invitation
            </Button>
          </div>

          <p className="mt-4 text-center text-xs leading-5 text-gray-400">
            By accepting this invitation, you will be able to complete your
            authority account setup.
          </p>
        </div>
      </Card>
    </div>
  );
}