
"use client";
import { Table } from "@heroui/react";
import { HiMagnifyingGlass, HiEye, HiPencilSquare, HiPower } from "react-icons/hi2";

export default function DepartmentsTable({ departments }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative bg-white min-w-[240px] flex-1">
          <HiMagnifyingGlass className="absolute  left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search department..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0F6848]"
          />
        </div>
        <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-[#11382B] focus:outline-none focus:border-[#0F6848]">
          <option value="">Status ▼</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Departments table" className="min-w-[600px]">
              <Table.Header>
                <Table.Column isRowHeader className="bg-[#EBF7F0] text-[#11382B]">Department</Table.Column>
                <Table.Column className="bg-[#EBF7F0] text-[#11382B]">Description</Table.Column>
                <Table.Column className="bg-[#EBF7F0] text-[#11382B]">Authorities</Table.Column>
                <Table.Column className="bg-[#EBF7F0] text-[#11382B]">Status</Table.Column>
                <Table.Column className="bg-[#EBF7F0] text-[#11382B]">Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                {departments.map((dept) => (
                  <Table.Row key={dept._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <Table.Cell className="font-semibold text-[#11382B]">{dept.departmentName}</Table.Cell>
                    <Table.Cell className="text-gray-600">
                      <div className="max-w-xs truncate" title={dept.description}>
                      {dept.description}
                    </div></Table.Cell>
                    <Table.Cell className="text-gray-700">{dept.authorities}</Table.Cell>
                    <Table.Cell>
                      <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800 font-medium">
                        {dept.status}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <button title="View" className="text-blue-600 hover:text-blue-800 p-1">
                          <HiEye className="w-4 h-4" />
                        </button>
                        <button title="Edit" className="text-amber-600 hover:text-amber-800 p-1">
                          <HiPencilSquare className="w-4 h-4" />
                        </button>
                        <button title="Deactivate" className="text-red-500 hover:text-red-700 p-1">
                          <HiPower className="w-4 h-4" />
                        </button>
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
}