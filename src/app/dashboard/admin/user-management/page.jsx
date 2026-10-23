"use client";

import {
FiUsers,
FiUser,
FiShield,
FiSearch,
FiMoreVertical,
} from "react-icons/fi";

import {
Button,
Input,
Table,
} from "@heroui/react";

import StatCard from "@/components/dashboard/admin/cards/StatCard";
import { BsFillBuildingFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { getAllUsers, getAuthority, getDepartment } from "@/lib/fetchData";
import UserManageDrop from "@/components/dashboard/admin/modals/UserManageDrop";

const UserManagePage = () => {
const [users,setUsers] = useState([]);

const fetchUser = async()=>{
    const data = await getAllUsers();
    const updatedUsers = await Promise.all(
        data.map(async (user) => ({
            ...user,
            authorityName: await getAuthority(
                user.authority?._id ?? user.authority
            ),
            departmentName: await getDepartment(
                user.department?._id ?? user.department
            ),
        }))
    );

    setUsers(updatedUsers);
    console.log(data);
}

useEffect(()=>{
 fetchUser();
},[]);

return (
<div className="min-h-screen bg-[#EBF7F0] p-4 sm:p-6 lg:p-8">
    <div className="mx-auto max-w-[1600px] space-y-6">
        <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-[#557065]">
                <span>Admin Dashboard</span>
                <span>/</span>
                <span className="font-medium text-[#0F6848]">
                    User Management
                </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#11382B] sm:text-3xl">
                User Management
            </h1>

            <p className="mt-2 text-sm text-[#557065]">
                Manage registered citizens, authorities and administrators
                of NogorBondhu.
            </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
                title="Total Users"
                value="—"
                icon={<FiUsers />}
                iconStyle="bg-[#DDF2E4] text-[#0F6848]"
            />

            <StatCard
                title="Citizens"
                value="—"
                icon={<FiUser />}
                iconStyle="bg-[#DDF2E4] text-[#0F6848]"
            />

            <StatCard
                title="Authorities"
                value="—"
                icon={<BsFillBuildingFill />}
                iconStyle="bg-[#DDF2E4] text-[#0F6848]"
            />

            <StatCard
                title="Administrators"
                value="—"
                icon={<FiShield />}
                iconStyle="bg-[#DDF2E4] text-[#0F6848]"
            />
        </div>

        <section className="overflow-hidden rounded-xl border border-[#D5EADF] bg-white shadow-sm">
        <div className="border-b border-[#D5EADF] p-4 sm:p-5">
            <div>
                <h2 className="text-lg font-semibold text-[#11382B]">
                    All Accounts
                </h2>

                <p className="mt-1 text-sm text-[#557065]">
                    View users and manage roles, authorities and departments.
                </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_180px_180px_auto]">
                <div className="relative ">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0F6848] z-20" />

                    <Input
                        aria-label="Search users"
                        placeholder="Search name, email or department..."
                        variant="bordered"
                        className="pl-8 w-full"
                    />
                </div>

                <select
                    aria-label="Filter by role"
                    defaultValue="all"
                    className="h-10 w-full rounded-xl border border-[#9BD3B6] bg-white px-3 text-sm text-[#2C4E40] outline-none transition focus:border-[#0F6848] focus:ring-2 focus:ring-[#DDF2E4]"
                >
                    <option value="all">All Roles</option>
                    <option value="user">User</option>
                    <option value="authority">Authority</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
        </div>

     <div className="p-4">
     <Table>
    <Table.ScrollContainer>
        <Table.Content
            aria-label="NogorBondhu user management table"
            className="min-w-[1000px]"
        >
            <Table.Header className={'bg-[#0F6848] '}>
                <Table.Column isRowHeader className={'text-white'}>
                    USER
                </Table.Column>
                <Table.Column className={'text-white'}>ROLE</Table.Column>
                <Table.Column className={'text-white'}>AUTHORITY</Table.Column>
                <Table.Column className={'text-white'}>DEPARTMENT</Table.Column>
                <Table.Column className={'text-white'}>JOINED AT</Table.Column>
                <Table.Column className={'text-white'}>STATUS</Table.Column>
            </Table.Header>

            <Table.Body>
                {users.length === 0 ? (
                    <Table.Row>
                        <Table.Cell>
                            <span className="text-sm text-[#557065]">
                                No users to display
                            </span>
                        </Table.Cell>
                        <Table.Cell>—</Table.Cell>
                        <Table.Cell>—</Table.Cell>
                        <Table.Cell>—</Table.Cell>
                        <Table.Cell>—</Table.Cell>
                        <Table.Cell>—</Table.Cell>
                    </Table.Row>
                ) : (
                    users.map((user) => (
                        <Table.Row key={user._id}>
                            <Table.Cell>
                                {user.name ?? "—"}
                            </Table.Cell>
                            <Table.Cell>
                                {user.role ?? "—"}
                            </Table.Cell>
                            <Table.Cell>
                                {user.authorityName ?? "—"}
                            </Table.Cell>
                            <Table.Cell>
                                {user.departmentName ?? "—"}
                            </Table.Cell>
                            <Table.Cell>
                                {new Date(user.createdAt).toLocaleDateString("en-GB")}
                            </Table.Cell>
                            <Table.Cell>
                                <div className="relative flex justify-center items-center gap-4">
                                        <span>{user.status ?? "—"}</span>
                                   <UserManageDrop user={user}/>
                                    </div>
                            </Table.Cell>
                        </Table.Row>
                    ))
                )}
            </Table.Body>
        </Table.Content>
    </Table.ScrollContainer>
     </Table>
     </div>
     </section>
    </div>
</div>
);
};

export default UserManagePage;