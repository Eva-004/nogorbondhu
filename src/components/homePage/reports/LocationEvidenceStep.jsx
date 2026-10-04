"use client";

import {
    Description,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaImages } from "react-icons/fa";

const LocationEvidenceStep = ({
    formRef,
    formData,
    setFormData,
}) => {
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);


    useEffect(() => {
        const fetchDivisions = async () => {
            const res = await fetch(
                "https://bdapi.vercel.app/api/v.1/division"
            );

            const data = await res.json();
            setDivisions(data.data);
        };

        fetchDivisions();
    }, []);

    useEffect(() => {
        if (!formData.division.id) {
            setDistricts([]);
            return;
        }

        const fetchDistricts = async () => {
            const res = await fetch(
                `https://bdapi.vercel.app/api/v.1/district/${formData.division.id}`
            );

            const data = await res.json();
            setDistricts(data.data);
        };

        fetchDistricts();
    }, [formData.division.id]);

    useEffect(() => {
        if (!formData.district.id) {
            setUpazilas([]);
            return;
        }

        const fetchUpazilas = async () => {
            const res = await fetch(
                `https://bdapi.vercel.app/api/v.1/upazilla/${formData.district.id}`
            );

            const data = await res.json();
            setUpazilas(data.data);
        };

        fetchUpazilas();
    }, [formData.district.id]);


    const handleEvidenceChange = (e) => {
        const files = Array.from(e.target.files);

        const newEvidence = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setFormData((prev) => ({
            ...prev,
            evidence: [...prev.evidence, ...newEvidence],
        }));

        e.target.value = "";
    };

    const handleRemoveImage = (index) => {
        setFormData((prev) => {
            const image = prev.evidence[index];

            if (image?.preview) {
                URL.revokeObjectURL(image.preview);
            }

            return {
                ...prev,
                evidence: prev.evidence.filter((_, i) => i !== index),
            };
        });
    };

    return (
        <div>
            <div className="mb-8">
                <p className="text-sm font-medium text-[#059669]">
                    Step 2 of 3
                </p>

                <h2 className="mt-1 text-xl font-semibold text-gray-900">
                    Add location and evidence
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Tell us where the problem is and add photos if available.
                </p>
            </div>

            <Form ref={formRef} className="flex flex-col gap-6">
                <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                        Problem Location
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                        Provide the location where the problem was observed.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                        <Label isRequired>Division</Label>

                        <select
                            name="division"
                            required
                            value={formData.division.id}
                            onChange={(e) => {
                                const selectedOption =
                                    e.target.options[e.target.selectedIndex];

                                setFormData((prev) => ({
                                    ...prev,
                                    division: {
                                        id: e.target.value,
                                        name: selectedOption.text,
                                    },
                                    district: {
                                        id: "",
                                        name: "",
                                    },
                                    upazila: {
                                        id: "",
                                        name: "",
                                    },
                                }));
                            }}
                            className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20"
                        >
                            <option value="" disabled>
                                Select Division
                            </option>

                            {divisions.map((division) => (
                                <option
                                    key={division.id}
                                    value={division.id}
                                >
                                    {division.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label isRequired>District</Label>

                        <select
                            name="district"
                            required
                            value={formData.district.id}
                            onChange={(e) => {
                                const selectedOption =
                                    e.target.options[e.target.selectedIndex];

                                setFormData((prev) => ({
                                    ...prev,
                                    district: {
                                        id: e.target.value,
                                        name: selectedOption.text,
                                    },
                                    upazila: {
                                        id: "",
                                        name: "",
                                    },
                                }));
                            }}
                            disabled={!formData.division.id}
                            className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20 disabled:cursor-not-allowed disabled:bg-gray-100"
                        >
                            <option value="" disabled>
                                Select District
                            </option>

                            {districts.map((district) => (
                                <option
                                    key={district.id}
                                    value={district.id}
                                >
                                    {district.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label isRequired>Upazila / Thana</Label>

                        <select
                            name="upazila"
                            required
                            value={formData.upazila.id}
                            onChange={(e) => {
                                const selectedOption =
                                    e.target.options[e.target.selectedIndex];

                                setFormData((prev) => ({
                                    ...prev,
                                    upazila: {
                                        id: e.target.value,
                                        name: selectedOption.text,
                                    },
                                }));
                            }}
                            disabled={!formData.district.id}
                            className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20 disabled:cursor-not-allowed disabled:bg-gray-100"
                        >
                            <option value="" disabled>
                                Select Upazila / Thana
                            </option>

                            {upazilas.map((upazila) => (
                                <option
                                    key={upazila.id}
                                    value={upazila.id}
                                >
                                    {upazila.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <TextField
                        isRequired
                        name="areaWard"
                        defaultValue={formData.areaWard}
                    >
                        <Label>Area / Ward</Label>

                        <Input placeholder="e.g. Ward 5, Ambarkhana" />
                    </TextField>
                </div>

                <TextField
                    isRequired
                    name="specificLocation"
                    defaultValue={formData.specificLocation}
                >
                    <Label>Specific Location</Label>

                    <Input
                        placeholder="e.g. Near Ambarkhana Point, beside the main road"
                    />

                    <Description>
                        Provide a nearby landmark or specific location to help
                        authorities locate the problem.
                    </Description>
                </TextField>

                <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-semibold text-gray-900">
                        Add Evidence
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                        Upload photos that can help authorities understand the
                        reported problem.
                    </p>
                </div>

                <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition hover:border-[#059669] hover:bg-[#F0FDF4]">
                    <div className="mx-auto flex max-w-md flex-col items-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#D1FAE5] text-[#059669]">
                            <FaImages className="h-6 w-6" />
                        </div>

                        <Label
                            htmlFor="evidence"
                            className="cursor-pointer text-sm font-semibold text-[#059669]"
                        >
                            Upload photos
                        </Label>

                        <p className="mt-1 text-xs text-gray-500">
                            PNG, JPG or JPEG up to 5MB each
                        </p>

                        <input
                            id="evidence"
                            name="evidence"
                            type="file"
                            accept="image/png,image/jpeg,image/jpg"
                            multiple
                            onChange={handleEvidenceChange}
                            className="hidden"
                        />
                    </div>
                </div>

                {formData.evidence.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        {formData.evidence.map((image, index) => (
                            <div
                                key={`${image.file.name}-${index}`}
                                className="relative overflow-hidden rounded-xl border border-gray-200 bg-white"
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

                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-lg leading-none text-white transition hover:bg-red-600"
                                >
                                    ×
                                </button>

                                <div className="border-t border-gray-200 px-3 py-2">
                                    <p className="truncate text-xs text-gray-600">
                                        {image.file.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <p className="text-xs text-gray-500">
                    Adding clear photos is optional but can help verify the
                    reported issue.
                </p>
            </Form>
        </div>
    );
};

export default LocationEvidenceStep;