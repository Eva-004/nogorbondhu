"use client";

import { useEffect, useState } from "react";
import { Button, Table } from "@heroui/react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import CategoryModal from "./CategoryModal";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function ProblemCategories({categories}) {

  const [departments, setDepartments] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  
  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/departments`);
      const data = await res.json();

      setDepartments(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchAuthorities = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/authorities`);
      const data = await res.json();

      setAuthorities(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchAuthorities();
    setLoading(false);
  }, []);

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-[#11382B]">
              Problem Categories
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage the problems citizens can report through NogorBondhu.
            </p>
          </div>
          
          <CategoryModal isOpen={isOpen} setIsOpen={setIsOpen} departments={departments} authorities={authorities}/>
         
        </div>

        <Table>
          <Table.ScrollContainer>
            <Table.Content
              aria-label="Problem categories"
              className="min-w-[850px]"
            >
              <Table.Header>
                <Table.Column isRowHeader>Category</Table.Column>
                <Table.Column>Department</Table.Column>
                <Table.Column>Authority</Table.Column>
                <Table.Column>Issues</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column>Actions</Table.Column>
              </Table.Header>

              <Table.Body
                isLoading={loading}
                items={categories}
                emptyContent="No problem categories found"
              >
                 {(category) => (
                  <Table.Row key={category._id}>
                    <Table.Cell>
                      <span className="font-medium text-[#11382B]">
                        {category.categoryName}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      {category.departmentName || "-"}
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-gray-600">
                        {category.authorityName || "-"}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      {category.reportCount || 0}
                    </Table.Cell>

                    <Table.Cell>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          category.status === "active"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {category.status === "active"
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-1">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          aria-label="Edit category"
                        >
                          <Pencil size={16} className="text-[#11382B]" />
                        </Button>

                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          aria-label="Delete category"
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

    </>
  );
}