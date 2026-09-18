"use client";
import { Table } from "@heroui/react";
import { HiMagnifyingGlass, HiEye, HiPencilSquare, HiTrash } from "react-icons/hi2";

export default function AuthoritiesTable() {
  const authorities = [
    
  ];

  return (
    <div className="space-y-4">
     
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative  bg-white min-w-[220px] flex-1">
          <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search authority..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0F6848]"
          />
        </div>
        <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-[#11382B]">
          <option value="">Department ▼</option>
          <option>Local Government</option>
          <option>Water & Sanitation</option>
        </select>
        <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-[#11382B]">
          <option value="">Division ▼</option>
          <option>Sylhet</option>
          <option>Dhaka</option>
        </select>
        <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-[#11382B]">
          <option value="">District ▼</option>
          <option>Sylhet</option>
          <option>Dhaka</option>
        </select>
        <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-[#11382B]">
          <option value="">Status ▼</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Authorities table" className="min-w-[600px]">
              <Table.Header>
                <Table.Column isRowHeader className="bg-[#EBF7F0] text-[#11382B]">Authority</Table.Column>
                <Table.Column className="bg-[#EBF7F0] text-[#11382B]">Department</Table.Column>
                <Table.Column className="bg-[#EBF7F0] text-[#11382B]">Area Coverage</Table.Column>
                <Table.Column className="bg-[#EBF7F0] text-[#11382B]">Categories</Table.Column>
                <Table.Column className="bg-[#EBF7F0] text-[#11382B]">Status</Table.Column>
                <Table.Column className="bg-[#EBF7F0] text-[#11382B]">Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                {authorities.map((item) => (
                  <Table.Row key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <Table.Cell className="font-semibold text-[#11382B]">{item.name}</Table.Cell>
                    <Table.Cell className="text-gray-700">{item.dept}</Table.Cell>
                    <Table.Cell className="text-gray-600">{item.area}</Table.Cell>
                    <Table.Cell className="text-gray-700 font-medium">{item.categories}</Table.Cell>
                    <Table.Cell>
                      <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800 font-medium">
                        {item.status}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <button title="View" className="text-blue-600 hover:text-blue-800 p-1 transition-colors">
                          <HiEye className="w-4 h-4" />
                        </button>
                        <button title="Edit" className="text-amber-600 hover:text-amber-800 p-1 transition-colors">
                          <HiPencilSquare className="w-4 h-4" />
                        </button>
                        <button title="Delete" className="text-red-500 hover:text-red-700 p-1 transition-colors">
                          <HiTrash className="w-4 h-4" />
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