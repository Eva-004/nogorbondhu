"use client";

import {
    Button,
    Input,
    Label,
    Modal,
    Surface,
    TextArea,
    TextField
} from "@heroui/react";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const CategoryModal = ({
    isOpen,
    setIsOpen,
    departments,
    authorities
}) => {
    const [departmentId, setDepartmentId] = useState("");

    const filteredAuthorities = authorities.filter(
        (authority) => authority.departmentId === departmentId
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const selectedDepartment = departments.find(
            (department) => department._id === data.departmentId
        );

        const selectedAuthority = authorities.find(
            (authority) => authority._id === data.authorityId
        );

        const categoryData = {
            categoryName: data.categoryName,
            description: data.description,
            departmentId: data.departmentId,
            departmentName: selectedDepartment?.departmentName,
            authorityId: data.authorityId,
            authorityName: selectedAuthority?.authorityName
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/problemCategories`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(categoryData)
            }
        );

        console.log(categoryData);
        setDepartmentId("");
        setIsOpen(false);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <Modal.Trigger>
                <Button
                    size="sm"
                    className="bg-[#11382B] text-white"
                    onPress={() => setIsOpen(true)}
                >
                    <Plus size={16} />
                    Add Category
                </Button>
            </Modal.Trigger>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Heading>
                                Add Problem Category
                            </Modal.Heading>

                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Create a problem category for citizens to
                                report.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-4"
                                >
                                    <TextField className="w-full">
                                        <Label isRequired>
                                            Category Name
                                        </Label>

                                        <Input
                                            name="categoryName"
                                            placeholder="Enter problem category"
                                        />
                                    </TextField>

                                    <div className="flex flex-col gap-1.5">
                                        <Label isRequired>
                                            Department
                                        </Label>

                                        <select
                                            name="departmentId"
                                            value={departmentId}
                                            onChange={(e) => {
                                                setDepartmentId(
                                                    e.target.value
                                                );
                                            }}
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#11382B]"
                                        >
                                            <option value="">
                                                Select department
                                            </option>

                                            {departments.map((department) => (
                                                <option
                                                    key={department._id}
                                                    value={department._id}
                                                >
                                                    {
                                                        department.departmentName
                                                    }
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <Label isRequired>
                                            Authority
                                        </Label>

                                        <select
                                            name="authorityId"
                                            disabled={!departmentId}
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#11382B] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                                        >
                                            <option value="">
                                                {departmentId
                                                    ? "Select authority"
                                                    : "Select department first"}
                                            </option>

                                            {filteredAuthorities.map(
                                                (authority) => (
                                                    <option
                                                        key={authority._id}
                                                        value={authority._id}
                                                    >
                                                        {
                                                            authority.authorityName
                                                        }
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                    <TextField className="w-full">
                                        <Label>Description</Label>

                                        <TextArea
                                            name="description"
                                            placeholder="Describe this problem category"
                                        />
                                    </TextField>

                                    <Modal.Footer>
                                        <Button
                                            slot="close"
                                            variant="secondary"
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            type="submit"
                                            className="bg-[#11382B] text-white"
                                        >
                                            Add Category
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
};

export default CategoryModal;