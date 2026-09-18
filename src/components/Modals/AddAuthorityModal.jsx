"use client";

import { Modal, Button, TextField, Label, Input, Surface } from "@heroui/react";
import { HiOutlineShieldCheck, HiPlus } from "react-icons/hi2";

export default function AddAuthorityModal() {
    return (
        <Modal>
            <Modal.Trigger>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-[#0F6848] text-white hover:bg-[#0b5037] rounded-lg text-sm font-semibold shadow-sm transition-all">
                    <HiPlus className="w-4 h-4 text-white" /> Add Authority
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
                                <form className="flex flex-col gap-4">
                                    <TextField
                                        className="w-full"
                                        name="authorityName"
                                        type="text"
                                    >
                                        <Label className="text-xs font-semibold text-[#11382B] mb-1 block">
                                            Authority Name <span className="text-red-500">*</span>
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
                                        <Label className="text-xs font-semibold text-[#11382B] mb-1 block">
                                            Authority Type <span className="text-red-500">*</span>
                                        </Label>

                                        <select className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-[#0F6848]">
                                            <option value="">Select Authority Type</option>
                                            <option value="city_corporation">
                                                City Corporation
                                            </option>
                                            <option value="municipality">
                                                Municipality
                                            </option>
                                            <option value="government_agency">
                                                Government Agency
                                            </option>
                                        </select>
                                    </TextField>

                                    <TextField
                                        className="w-full"
                                        name="department"
                                    >
                                        <Label className="text-xs font-semibold text-[#11382B] mb-1 block">
                                            Department <span className="text-red-500">*</span>
                                        </Label>

                                        <select className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-[#0F6848]">
                                            <option value="">Select Department</option>
                                            <option value="local_government">
                                                Local Government
                                            </option>
                                            <option value="transport">
                                                Transport
                                            </option>
                                            <option value="water_sanitation">
                                                Water & Sanitation
                                            </option>
                                        </select>
                                    </TextField>

                                    <div className="pt-1">
                                        <p className="text-xs font-bold text-[#11382B] mb-3">
                                            Area Coverage
                                        </p>

                                        <div className="grid grid-cols-2 gap-3">
                                            <TextField
                                                className="w-full"
                                                name="division"
                                            >
                                                <Label className="text-xs font-semibold text-[#11382B] mb-1 block">
                                                    Division <span className="text-red-500">*</span>
                                                </Label>

                                                <select className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-[#0F6848]">
                                                    <option value="">Select Division</option>
                                                    <option value="sylhet">Sylhet</option>
                                                    <option value="dhaka">Dhaka</option>
                                                    <option value="chattogram">Chattogram</option>
                                                </select>
                                            </TextField>

                                            <TextField
                                                className="w-full"
                                                name="district"
                                            >
                                                <Label className="text-xs font-semibold text-[#11382B] mb-1 block">
                                                    District <span className="text-red-500">*</span>
                                                </Label>

                                                <select className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-[#0F6848]">
                                                    <option value="">Select District</option>
                                                    <option value="sylhet">Sylhet</option>
                                                    <option value="dhaka">Dhaka</option>
                                                    <option value="chattogram">Chattogram</option>
                                                </select>
                                            </TextField>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mt-3">
                                            <TextField
                                                className="w-full"
                                                name="coverageLevel"
                                            >
                                                <Label className="text-xs font-semibold text-[#11382B] mb-1 block">
                                                    Coverage Level{" "}
                                                    <span className="text-red-500">*</span>
                                                </Label>

                                                <select className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-[#0F6848]">
                                                    <option value="">Select Level</option>
                                                    <option value="district">District</option>
                                                    <option value="city_corporation">
                                                        City Corporation
                                                    </option>
                                                    <option value="municipality">
                                                        Municipality
                                                    </option>
                                                </select>
                                            </TextField>

                                            <TextField
                                                className="w-full"
                                                name="localArea"
                                            >
                                                <Label className="text-xs font-semibold text-[#11382B] mb-1 block">
                                                    City / Upazila / Area
                                                </Label>

                                                <Input
                                                    placeholder="e.g. Sylhet City"
                                                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0F6848] focus:ring-1 focus:ring-[#0F6848]"
                                                />
                                            </TextField>
                                        </div>

                                        <TextField
                                            className="w-full mt-3"
                                            name="wards"
                                        >
                                            <Label className="text-xs font-semibold text-[#11382B] mb-1 block">
                                                Wards / Specific Areas
                                            </Label>

                                            <Input
                                                placeholder="e.g. Ward 1 - Ward 42"
                                                className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0F6848] focus:ring-1 focus:ring-[#0F6848]"
                                            />
                                        </TextField>
                                    </div>

                                    <TextField
                                        className="w-full"
                                        name="status"
                                    >
                                        <Label className="text-xs font-semibold text-[#11382B] mb-1 block">
                                            Status
                                        </Label>

                                        <select className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-[#0F6848]">
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </TextField>

                                    <Modal.Footer className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3 -mx-6 -mb-6 mt-2">
                                        <Button
                                            slot="close"
                                            className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
                                        >
                                            Cancel
                                        </Button>

                                        <Button
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