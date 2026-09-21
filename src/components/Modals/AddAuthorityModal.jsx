"use client";

import { Modal, Button, TextField, Label, Input, Surface } from "@heroui/react";
import { useEffect, useState } from "react";
import { HiOutlineShieldCheck, HiPlus } from "react-icons/hi2";
import { toast } from "react-toastify";

export default function AddAuthorityModal({ departments }) {
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [unions, setUnions] = useState([]);
    const [coverageLevel, setCoverageLevel] = useState("");

    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedUpazila, setSelectedUpazila] = useState("");

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

    const handleDivisionChange = async (e) => {
        const divisionId = e.target.value;

        setSelectedDivision(divisionId);
        setSelectedDistrict("");
        setSelectedUpazila("");

        setDistricts([]);
        setUpazilas([]);
        setUnions([]);

        const res = await fetch(`https://bdapi.vercel.app/api/v.1/district/${divisionId}`
        );

        const data = await res.json();
        setDistricts(data.data);
    };

    const handleDistrictChange = async (e) => {
        const districtId = e.target.value;

        setSelectedDistrict(districtId);
        setSelectedUpazila("");

        setUpazilas([]);
        setUnions([]);

        const res = await fetch(
            `https://bdapi.vercel.app/api/v.1/upazilla/${districtId}`
        );

        const data = await res.json();
        setUpazilas(data.data);
    };
    const handleUpazilaChange = async (e) => {
        const upazilaId = e.target.value;

        setSelectedUpazila(upazilaId);
        setUnions([]);

        const res = await fetch(
            `https://bdapi.vercel.app/api/v.1/union/${upazilaId}`
        );

        const data = await res.json();
        setUnions(data.data);
    };

    const [isOpen, setIsOpen] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const authorities = Object.fromEntries(formData.entries());
        const departmentName = departments.find(
            (department) => department._id === authorities.department_id
        );
        const authorityData = {
            authorityName: authorities.authorityName,
            authorityType: authorities.authorityType,
            departmentId: authorities.department_id,
            departmentName: departmentName?.departmentName || "",
            coverage: {
                level: coverageLevel,
                divisionId: authorities.divisionId || null,
                districtId: authorities.districtId || null,
                upazilaId: authorities.upazilaId || null,
            },
            status: authorities.status,
        };
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/authorities`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(authorityData),
            }
        );
        const data = await res.json();
        if (!res.ok) {
            toast.error(data.message);
            return;
        }
        else {
            toast.success("Added authority successfully!");
            setIsOpen(false);
        }
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <Modal.Trigger>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-[#0F6848] text-white hover:bg-[#0b5037] rounded-lg text-sm font-semibold shadow-sm transition-all">
                    <HiPlus className="w-4 h-4 text-white" />
                    Add Authority
                </button>
            </Modal.Trigger>

            <Modal.Backdrop className="bg-black/40 backdrop-blur-sm">
                <Modal.Container placement="center">
                    <Modal.Dialog className="sm:max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <Modal.CloseTrigger className="text-gray-400 hover:text-gray-600" />

                        <Modal.Header className="bg-[#EBF7F0]/60 p-6 border-b border-gray-100">
                            <Modal.Icon className="bg-[#EBF7F0] text-[#0F6848] p-3 rounded-xl border border-[#0F6848]/10 inline-flex">
                                <HiOutlineShieldCheck className="w-6 h-6 text-[#0F6848]" />
                            </Modal.Icon>

                            <Modal.Heading className="text-xl font-bold text-[#11382B] mt-2">
                                Add New Authority
                            </Modal.Heading>

                            <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                                Register an authority to handle public issues within specific areas.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <TextField
                                        className="w-full"
                                        name="authorityName"
                                        type="text"
                                    >
                                        <Label isRequired className="text-xs font-semibold text-[#11382B] mb-1 block">
                                            Authority Name
                                        </Label>

                                        <Input
                                            placeholder="e.g. Sylhet City Corporation"
                                            className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0F6848] focus:ring-1 focus:ring-[#0F6848]"
                                        />
                                    </TextField>

                                    <TextField
                                        className="w-full"
                                        name="authorityType"
                                    >
                                        <Label isRequired className="text-xs font-semibold text-[#11382B] mb-1 block">
                                            Authority Type
                                        </Label>

                                        <select
                                            name="authorityType"
                                            className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-[#0F6848]"
                                        >
                                            <option value="">
                                                Select Authority Type
                                            </option>
                                            <option value="City corporation">
                                                City Corporation
                                            </option>
                                            <option value="Upazila">
                                                Upazila
                                            </option>
                                            <option value="Government Agency">
                                                Government Agency
                                            </option>
                                        </select>
                                    </TextField>

                                    <TextField
                                        className="w-full"
                                        name="department_id"
                                    >
                                        <Label isRequired className="text-xs font-semibold text-[#11382B] mb-1 block">
                                            Department

                                        </Label>

                                        <select
                                            className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-[#0F6848]"
                                            name="department_id"
                                        >
                                            <option value="">
                                                Select Department
                                            </option>

                                            {departments.map((department) => (
                                                <option
                                                    key={department._id}
                                                    value={department._id}
                                                >
                                                    {department.departmentName}
                                                </option>
                                            ))}
                                        </select>
                                    </TextField>

                                    <div className="space-y-4">
                                        <div>
                                            <Label isRequired>Division</Label>
                                            <select
                                                name="divisionId"
                                                value={selectedDivision}
                                                onChange={handleDivisionChange}
                                                className="w-full rounded-lg border px-3 py-2.5"
                                                required
                                            >
                                                <option value="">Select Division</option>

                                                {divisions.map((division) => (
                                                    <option key={division.id} value={division.id}>
                                                        {division.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <Label isRequired>Coverage Level</Label>
                                            <select
                                                name="coverageLevel"
                                                value={coverageLevel}
                                                onChange={(e) => setCoverageLevel(e.target.value)}
                                                className="w-full rounded-lg border px-3 py-2.5"
                                                required
                                            >
                                                <option value="">Select Level</option>
                                                <option value="division">Division</option>
                                                <option value="district">District</option>
                                                <option value="city-corporation">City Corporation</option>
                                                <option value="upazila">Upazila</option>
                                            </select>
                                        </div>

                                        {(coverageLevel === "district" ||
                                            coverageLevel === "upazila") && (
                                                <div>
                                                    <Label isRequired>District</Label>
                                                    <select
                                                        name="districtId"
                                                        value={selectedDistrict}
                                                        onChange={handleDistrictChange}
                                                        className="w-full rounded-lg border px-3 py-2.5"
                                                        required
                                                    >
                                                        <option value="">Select District</option>

                                                        {districts.map((district) => (
                                                            <option key={district.id} value={district.id}>
                                                                {district.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}

                                        {coverageLevel === "upazila" && (
                                            <div>
                                                <Label isRequired>Upazila</Label>
                                                <select
                                                    name="upazilaId"
                                                    value={selectedUpazila}
                                                    onChange={handleUpazilaChange}
                                                    className="w-full rounded-lg border px-3 py-2.5"
                                                    required
                                                >
                                                    <option value="">Select Upazila</option>

                                                    {upazilas.map((upazila) => (
                                                        <option key={upazila.id} value={upazila.id}>
                                                            {upazila.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                    </div>

                                    <TextField
                                        className="w-full"
                                        name="status"
                                    >
                                        <Label className="text-xs font-semibold text-[#11382B] mb-1 block">
                                            Status
                                        </Label>

                                        <select
                                            name="status"
                                            className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-[#0F6848]"
                                        >
                                            <option value="active">
                                                Active
                                            </option>
                                            <option value="inactive">
                                                Inactive
                                            </option>
                                        </select>
                                    </TextField>

                                    <Modal.Footer className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3 -mx-6 -mb-6 mt-2">
                                        <Button
                                            slot="close"
                                            className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
                                        >
                                            Cancel
                                        </Button>

                                        <Button type="submit"
                                            className="px-5 py-2 text-sm font-semibold text-white bg-[#0F6848] hover:bg-[#0b5037] rounded-lg shadow-sm transition-all"
                                        >
                                            Save
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}