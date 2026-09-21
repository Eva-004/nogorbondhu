
import Link from "next/link";
import {
    HiArrowLeft,
    HiOutlinePencilSquare,
    HiOutlineShieldCheck,
    HiOutlineBuildingOffice2,
    HiOutlineMapPin,
    HiOutlineUserPlus,
} from "react-icons/hi2";
import AuthorityCoverageArea from "@/components/dashboard/admin/AuthorityCoverageArea";
import AuthorityInvitation from "@/components/dashboard/admin/AuthorityInvitation";

async function getInvitations() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/authority-invitations`);
    return res.json();
}

const AuthorityDetailsPage = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/authorities/${id}`);
    const authority = await res.json();
    console.log(authority);
    const invitations = await getInvitations();
    const authorityHead = invitations.find((it) => it.authorityId === authority._id);
    return (
        <div className="space-y-6 p-6">


            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <Link
                        href="/dashboard/admin/department-authority-management"
                        className="mb-3 btn btn-outline inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#0F6848]"
                    >
                        <HiArrowLeft className="text-lg" />
                        Back to Authorities
                    </Link>

                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            {authority.authorityName}
                        </h1>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        Manage authority information, coverage and authority head.
                    </p>
                </div>

                <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F6848] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0c563d]">
                    <HiOutlinePencilSquare className="text-lg" />
                    Edit Authority
                </button>
            </div>


            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-[#0F6848]">
                        <HiOutlineShieldCheck className="text-xl" />
                    </div>

                    <div>
                        <h2 className="font-semibold text-gray-900">
                            Authority Information
                        </h2>
                        <p className="text-sm text-gray-500">
                            Basic information about this authority
                        </p>
                    </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <p className="text-sm text-gray-500">Authority Name</p>
                        <p className="mt-1 font-medium text-gray-900">
                            {authority.authorityName}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Authority Type</p>
                        <p className="mt-1 font-medium text-gray-900">
                            {authority.authorityType}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="mt-1 font-medium text-gray-900">
                            {authority.departmentName}
                        </p>
                    </div>
                </div>
            </div>


            <AuthorityCoverageArea authority={authority} />

            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-[#0F6848]">
                        <HiOutlineBuildingOffice2 className="text-xl" />
                    </div>

                    <div>
                        <h2 className="font-semibold text-gray-900">
                            Authority Head
                        </h2>
                        <p className="text-sm text-gray-500">
                            Manage the head of this authority
                        </p>
                    </div>
                </div>

                <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">

                    {authorityHead?.status === "pending" ? (
                        <>
                            <HiOutlineUserPlus className="mx-auto text-3xl text-yellow-500" />

                            <h3 className="mt-3 font-medium text-gray-900">
                                Invitation Pending
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                An invitation has been sent to{" "}
                                <span className="font-medium text-gray-700">
                                    {authorityHead.email}
                                </span>
                            </p>
                        </>
                    ) : authorityHead?.status === "accepted" ? (
                        <>
                            <HiOutlineUserPlus className="mx-auto text-3xl text-[#0F6848]" />

                            <h3 className="mt-3 font-medium text-gray-900">
                                {authorityHead.name}
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                {authorityHead.email}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                Role:{" "}
                                <span className="font-medium text-gray-700">
                                    {authorityHead.role}
                                </span>
                            </p>
                        </>
                    ) : (
                        <>
                            <HiOutlineUserPlus className="mx-auto text-3xl text-gray-400" />

                            <h3 className="mt-3 font-medium text-gray-900">
                                No authority head has been assigned
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                                An authority head can manage reports and activities
                                assigned to this authority.
                            </p>

                            <AuthorityInvitation authority={authority} />
                        </>
                    )}

                </div>
            </div>

        </div>
    );
};

export default AuthorityDetailsPage;