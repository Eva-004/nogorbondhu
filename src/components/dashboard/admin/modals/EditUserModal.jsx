"use client";

import { useEffect, useState } from "react";
import {
    Button,
    Label,
    Modal,
    Surface,
    TextField,
} from "@heroui/react";
import { getAuthorities, getDepartments, getRoles } from "@/lib/fetchData";

export function EditUserModal({ user, isOpen, onOpenChange }) {
    const [role, setRole] = useState(user?.role ?? "");
    const [authority, setAuthority] = useState(user?.authority?._id ?? user?.authority ?? "");
    const [department, setDepartment] = useState(user?.department?._id ?? user?.department ?? "");
    const [departments, setDepartments] = useState([]);
    const [authorities, setAuthorities] = useState([]);
    const [roles, setRoles] = useState([]);

    const fetchData = async () => {
        const deptData = await getDepartments();
        setDepartments(deptData);
        const authData = await getAuthorities();
        setAuthorities(authData);
        const roleData = await getRoles();
        setRoles(roleData);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${user._id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role,
                    authority,
                    department
                }),
            }
        );

        const data = await res.json();
        onOpenChange(false);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Heading>Edit User</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Update the user`s role, authority, and department.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={handleSubmit}
                                    className="flex flex-col gap-4" >
                                    <TextField className="w-full" >
                                        <Label>Role</Label>
                                        <select
                                            value={role}
                                            name="role"
                                            onChange={(e) => setRole(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#0F6848]"
                                        >
                                            <option value="">Select role</option>
                                            {roles.map((item) => (
                                                <option key={item._id} value={item.slug}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </TextField>

                                    <TextField className="w-full" >
                                        <Label>Authority</Label>
                                        <select
                                            value={authority}
                                            name="authority"
                                            onChange={(e) => setAuthority(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#0F6848]"
                                        >
                                            <option value="">Select authority</option>
                                            {authorities.map((item) => (
                                                <option key={item._id} value={item._id}>
                                                    {item.authorityName}
                                                </option>
                                            ))}
                                        </select>
                                    </TextField>

                                    <TextField className="w-full" >
                                        <Label>Department</Label>
                                        <select
                                            value={department}
                                            name="department"
                                            onChange={(e) => setDepartment(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#0F6848]"
                                        >
                                            <option value="">Select department</option>
                                            {departments.map((item) => (
                                                <option key={item._id} value={item._id}>
                                                    {item.departmentName}
                                                </option>
                                            ))}
                                        </select>
                                    </TextField>
                                    <Modal.Footer>
                                        <Button slot="close" variant="secondary">
                                            Cancel
                                        </Button>

                                        <Button type="submit" className={'bg-[#0F6848] '}>
                                            Save Changes
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
