"use client";

import Image from "next/image";

const ReviewSubmitStep = ({ data }) => {
    return (
        <div>
            <div className="mb-8">
                <p className="text-sm font-medium text-[#0F6848]">
                    Step 3 of 3
                </p>

                <h2 className="mt-1 text-xl font-semibold text-gray-900">
                    Review your report
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Check your information before submitting the report.
                </p>
            </div>

            <div className="space-y-6">
                <div className="rounded-xl border border-gray-200">
                    <div className="border-b border-gray-100 px-5 py-4">
                        <h3 className="text-sm font-semibold text-gray-900">
                            Problem Information
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                            Basic information about the reported problem.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Problem Title
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-900">
                                {data?.title || "N/A"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Category
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-900">
                                {data?.category?.name || "N/A"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Priority
                            </p>

                            <span className="mt-1 inline-flex rounded-full bg-[#ECFDF5] px-2.5 py-1 text-xs font-medium capitalize text-[#0F6848]">
                                {data?.priority || "N/A"}
                            </span>
                        </div>

                        <div className="md:col-span-2">
                            <p className="text-xs font-medium text-gray-500">
                                Description
                            </p>

                            <p className="mt-1 whitespace-pre-line text-sm leading-6 text-gray-700">
                                {data?.description || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200">
                    <div className="border-b border-gray-100 px-5 py-4">
                        <h3 className="text-sm font-semibold text-gray-900">
                            Problem Location
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                            Location details of the reported problem.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Division
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-900">
                                {data?.division?.name || "N/A"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                District
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-900">
                                {data?.district?.name || "N/A"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Upazila / Thana
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-900">
                                {data?.upazila?.name || "N/A"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Area / Ward
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-900">
                                {data?.areaWard || "N/A"}
                            </p>
                        </div>

                        <div className="sm:col-span-2">
                            <p className="text-xs font-medium text-gray-500">
                                Specific Location
                            </p>

                            <p className="mt-1 text-sm leading-6 text-gray-700">
                                {data?.specificLocation || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200">
                    <div className="border-b border-gray-100 px-5 py-4">
                        <h3 className="text-sm font-semibold text-gray-900">
                            Evidence
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                            Photos attached to support this report.
                        </p>
                    </div>

                    <div className="p-5">
                        {data?.evidence?.length > 0 ? (
                            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                                {data.evidence.map((image, index) => (
                                    <div
                                        key={`${image.file.name}-${index}`}
                                        className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                                    >
                                        <div className="relative aspect-square">
                                            <Image
                                                src={image.preview}
                                                alt={image.file.name}
                                                fill
                                                unoptimized
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-lg bg-gray-50 px-4 py-5 text-center">
                                <p className="text-sm text-gray-500">
                                    No photos added
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="rounded-xl border border-[#A7F3D0] bg-[#F0FDF4] px-5 py-4">
                    <p className="text-sm font-medium text-[#0F6848]">
                        Ready to submit?
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-600">
                        Please make sure all the information above is correct.
                        Once submitted, your report will be reviewed by the
                        appropriate authority.
                    </p>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="button"
                        className="cursor-pointer rounded-lg bg-[#0F6848] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B553B]"
                    >
                        Submit Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewSubmitStep;