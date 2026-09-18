"use client";

import { Modal, Button, TextField, Label, Input, Surface } from "@heroui/react";
import { useState } from "react";
import { HiOutlineBuildingOffice2, HiPlus } from "react-icons/hi2";
import { toast } from "react-toastify";

export default function AddDepartmentModal() {
    const [isOpen, setIsOpen] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const departments = Object.fromEntries(formData.entries());
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/departments`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    departmentName: departments.departmentName,
                    description: departments.description,
                    status: departments.status || "active",
                }),
            }
        );
        const data = await res.json();
        if (!res.ok) {
            toast.error(data.message);
            return;
        }
        else {
            toast.success("Added department successfully!");
            setIsOpen(false);
        }
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <Modal.Trigger>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-[#EBF7F0] text-[#0F6848] hover:bg-[#d8f0e3] border border-[#0F6848]/20 rounded-lg text-sm font-semibold transition-all">
                    <HiPlus className="w-4 h-4 text-[#0F6848]" /> Add Department
                </button>
            </Modal.Trigger>
            <Modal.Backdrop className="bg-black/40 backdrop-blur-sm">
                <Modal.Container placement="center">
                    <Modal.Dialog className="sm:max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <Modal.CloseTrigger className="text-gray-400 hover:text-gray-600" />

                        <Modal.Header className="bg-[#EBF7F0]/60 p-6 border-b border-gray-100">
                            <Modal.Icon className="bg-[#EBF7F0] text-[#0F6848] p-3 rounded-xl border border-[#0F6848]/10 inline-flex">
                                <HiOutlineBuildingOffice2 className="w-6 h-6 text-[#0F6848]" />
                            </Modal.Icon>
                            <Modal.Heading className="text-xl font-bold text-[#11382B] mt-2">
                                Add New Department
                            </Modal.Heading>
                            <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                                Create a new government department to categorize authority services across NogorBondhu.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <TextField className="w-full" name="departmentName" type="text">
                                        <Label className="text-xs font-semibold text-[#11382B] mb-1 block">
                                            Department Name <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            placeholder="e.g. Health & Sanitation"
                                            className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0F6848] focus:ring-1 focus:ring-[#0F6848]"
                                        />
                                    </TextField>

                                    <TextField className="w-full" >
                                        <Label className="text-xs font-semibold text-[#11382B] mb-1 block">
                                            Description <span className="text-red-500">*</span>
                                        </Label>
                                        <textarea
                                            name="description"
                                            rows={3}
                                            placeholder="Briefly describe the department's responsibilities..."
                                            className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0F6848] focus:ring-1 focus:ring-[#0F6848] resize-none"
                                        />
                                    </TextField>

                                    <TextField className="w-full" name="status">
                                        <Label className="text-xs font-semibold text-[#11382B] mb-1 block">
                                            Initial Status
                                        </Label>
                                        <select className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-[#0F6848]">
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </TextField>
                                    <Modal.Footer className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3">
                                        <Button
                                            slot="close"
                                            className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
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