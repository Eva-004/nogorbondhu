"use client";

import React from "react";
import { Table, Button, Chip } from "@heroui/react";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import AddRoleModal from "@/components/dashboard/admin/AddRoleModal";

const RoleAndPermission = () => {
  const roles =[];

  const handleAddRole = () => {};

  const handleEdit = (role) => {
    console.log("Edit:", role);
  };

  const handleDelete = (role) => {
    console.log("Delete:", role);
  };

  return (
    <div className="space-y-6 w-11/12 mx-auto py-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#11382B]">
            Roles & Permissions
          </h1>

          <p className="mt-1 text-sm text-[#557065]">
            Manage roles and control their dashboard permissions.
          </p>
        </div>

        <AddRoleModal/>
      </div>

      <div className="rounded-xl border border-[#D5EADF] bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-[#11382B]">
            All Roles
          </h2>

          <p className="mt-1 text-sm text-[#557065]">
            View and manage roles available in NagarBondhu.
          </p>
        </div>

        <Table>
          <Table.ScrollContainer>
            <Table.Content
              aria-label="Roles and permissions"
              className="min-w-[700px]"
            >
              <Table.Header>
                <Table.Column isRowHeader>Name</Table.Column>
                <Table.Column>Permissions</Table.Column>
                <Table.Column>Actions</Table.Column>
              </Table.Header>

              <Table.Body>
                {roles.map((role) => (
                  <Table.Row key={role._id}>
                    <Table.Cell>
                      <div className="flex items-center gap-3">

                        <p className="font-semibold text-[#2C4E40]">
                          {role.name}
                        </p>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex max-w-[500px] flex-wrap gap-1.5">
                        {role.permissions.slice(0, 3).map((permission) => (
                          <Chip
                            key={permission}
                            size="sm"
                            variant="flat"
                            className="bg-[#DDF2E4] text-[#0F6848]"
                          >
                            {permission}
                          </Chip>
                        ))}

                        {role.permissions.length > 3 && (
                          <Chip
                            size="sm"
                            variant="flat"
                            className="bg-[#F1F5F3] text-[#557065]"
                          >
                            +{role.permissions.length - 3} more
                          </Chip>
                        )}
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-1">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          aria-label={`Edit ${role.name}`}
                          onPress={() => handleEdit(role)}
                          className="text-[#0F6848] hover:bg-[#DDF2E4]"
                        >
                          <FiEdit2 size={17} />
                        </Button>

                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          aria-label={`Delete ${role.name}`}
                          onPress={() => handleDelete(role)}
                          className="text-red-500 hover:bg-red-50"
                        >
                          <FiTrash2 size={17} />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
};

export default RoleAndPermission;