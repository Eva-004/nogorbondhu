"use client";

import { Plus, TrashBin } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, TextField } from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";

const slugify = (value) => {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
};

const AddRoleModal = () => {
    const [roleName, setRoleName] = useState("");
    const [permissions, setPermissions] = useState([""]);
    const [isOpen, setIsOpen] = useState(false);
    const roleSlug = slugify(roleName);

    const handleAddPermission = () => {
        setPermissions((prev) => [...prev, ""]);
    };

    const handlePermissionChange = (index, value) => {
        setPermissions((prev) =>
            prev.map((permission, i) =>
                i === index ? value : permission
            )
        );
    };

    const handleRemovePermission = (index) => {
        setPermissions((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const roleData = {
            name: roleName.trim(),
            slug: roleSlug,
            permissions: permissions.filter((permission) => permission.trim()).map((permission) => {
                const permissionSlug = slugify(permission);

                return {
                    label: permission.trim(),
                    href: permissionSlug === "overview"
                        ? `/dashboard/${roleSlug}`
                        : `/dashboard/${roleSlug}/${permissionSlug}`,
                };
            }),
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/roles`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(roleData),
            }
        );

        const data = await res.json();
        console.log(data);
        toast.success("Added new role successfully")
        setRoleName("");
        setPermissions([""]);
        setIsOpen(false);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <Button className="bg-[#0F6848] text-white font-semibold hover:bg-[#0b5037] shadow-sm" onPress={() => setIsOpen(true)}>
                <FaPlus size={18} />
                Add New Role
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-xl">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Heading className="text-[#0F6848]">
                                Add New Role
                            </Modal.Heading>

                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Create a role and assign dashboard permissions.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="max-h-[70vh] overflow-y-auto p-6">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <TextField
                                    className="w-full"
                                    name="roleName"
                                    variant="secondary"
                                >
                                    <Label>Role Name</Label>
                                    <Input
                                        placeholder="e.g. Authority Staff"
                                        value={roleName}
                                        onChange={(e) => setRoleName(e.target.value)}
                                    />
                                </TextField>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium">
                                                Permissions
                                            </h3>

                                            <p className="mt-0.5 text-xs text-muted">
                                                Add the dashboard pages this role can access.
                                            </p>
                                        </div>

                                        <Button
                                            type="button"
                                            size="sm"
                                            className="bg-[#0F6848]"
                                            onPress={handleAddPermission}
                                        >
                                            <Plus className="size-4" />
                                            Add Permission
                                        </Button>
                                    </div>

                                    <div className="space-y-3">
                                        {permissions.map((permission, index) => (
                                            <div
                                                key={index}
                                                className="flex items-end gap-2 rounded-xl border border-default p-3"
                                            >
                                                <TextField
                                                    className="w-full"
                                                    name={`permission-${index}`}
                                                    variant="secondary"
                                                >
                                                    <Label>
                                                        Permission Label
                                                    </Label>

                                                    <Input
                                                        value={permission}
                                                        onChange={(e) =>
                                                            handlePermissionChange(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="e.g. Issue & Report"
                                                    />
                                                </TextField>

                                                <Button
                                                    type="button"
                                                    isIconOnly
                                                    variant="ghost"
                                                    className="text-danger"
                                                    aria-label="Remove permission"
                                                    onPress={() =>
                                                        handleRemovePermission(index)
                                                    }
                                                >
                                                    <TrashBin className="size-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Modal.Footer>
                                    <Button
                                        slot="close"
                                        variant="secondary"
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        className="bg-[#0F6848]"
                                        type="submit"
                                    >
                                        Create Role
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default AddRoleModal;