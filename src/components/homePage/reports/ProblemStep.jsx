"use client";

import {
    FieldError,
    Form,
    Input,
    Label,
    TextArea,
    TextField,
} from "@heroui/react";
import { useEffect, useState } from "react";

const ProblemStep = ({ formRef, formData, setFormData }) => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/problemCategories`
        );

        const data = await res.json();
        setCategories(data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            <div className="mb-8">
                <p className="text-sm font-medium text-[#0F6848]">
                    Step 1 of 3
                </p>

                <h2 className="mt-1 text-xl font-semibold text-gray-900">
                    Tell us about the problem
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Provide the basic information about the public issue.
                </p>
            </div>

            <Form ref={formRef} className="flex flex-col gap-6">
                <TextField
                    isRequired
                    name="title"
                    defaultValue={formData.title}
                >
                    <Label>Problem Title</Label>

                    <Input
                        placeholder="e.g. Damaged road near the main market"
                        className="mt-1"
                    />

                    <FieldError />
                </TextField>

                <div className="flex flex-col gap-1.5">
                    <Label isRequired>Problem Category</Label>

                    <select
                        name="category"
                        required
                        value={formData.category.id}
                        onChange={(e) => {
                            const selectedOption =
                                e.target.options[e.target.selectedIndex];

                            setFormData((prev) => ({
                                ...prev,
                                category: {
                                    id: e.target.value,
                                    name: selectedOption.text,
                                },
                            }));
                        }}
                        className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20"
                    >
                        <option value="" disabled>
                            Select a category
                        </option>

                        {categories.map((category) => (
                            <option
                                key={category._id}
                                value={category._id}
                            >
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label>Priority</Label>

                    <select
                        name="priority"
                        defaultValue={formData.priority}
                        className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20"
                    >
                        <option value="" disabled>
                            Select Priority
                        </option>

                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                    </select>
                </div>

                <TextField
                    isRequired
                    name="description"
                    defaultValue={formData.description}
                >
                    <Label>Problem Description</Label>

                    <TextArea
                        placeholder="Describe what happened, where the problem is, and how it is affecting the community..."
                        rows={6}
                    />

                    <FieldError />
                </TextField>
            </Form>
        </div>
    );
};

export default ProblemStep;