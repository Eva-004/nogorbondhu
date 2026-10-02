"use client";

import { useEffect, useState } from "react";
import { Button, Input, Table } from "@heroui/react";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function AllReports() {
  const [reports, setReports] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [authorities, setAuthorities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [authority, setAuthority] = useState("");
  const [status, setStatus] = useState("");

  

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
  }, []);


  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex flex-col lg:flex-row gap-3 mb-5">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search issue..."
          size="sm"
          className="lg:max-w-xs"
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="h-9 lg:w-48 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-[#11382B]"
        >
          <option value="">Department</option>

          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>

        <select
          value={authority}
          onChange={(e) => setAuthority(e.target.value)}
          className="h-9 lg:w-48 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-[#11382B]"
        >
          <option value="">Authority</option>

          {authorities.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-9 lg:w-40 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-[#11382B]"
        >
          <option value="">Status</option>
          <option value="Pending">Pending</option>
          <option value="Under Review">Under Review</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Issue reports"
            className="min-w-[1100px]"
          >
            <Table.Header>
              <Table.Column isRowHeader>Issue</Table.Column>
              <Table.Column>Category</Table.Column>
              <Table.Column>Department</Table.Column>
              <Table.Column>Authority</Table.Column>
              <Table.Column>Reported By</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Date</Table.Column>
              
            </Table.Header>

            <Table.Body
              isLoading={loading}
              items={reports}
              emptyContent="No reports found"
            >
              {(report) => (
                <Table.Row key={report._id}>
                  <Table.Cell>
                    <div>
                      <p className="font-medium text-[#11382B]">
                        {report.title}
                      </p>

                      <p className="text-xs text-gray-400">
                        {report._id}
                      </p>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    {report.category?.name || "-"}
                  </Table.Cell>

                  <Table.Cell>
                    {report.department?.name || "-"}
                  </Table.Cell>

                  <Table.Cell>
                    {report.authority?.name || "-"}
                  </Table.Cell>

                  <Table.Cell>
                    {report.reportedBy?.name || "-"}
                  </Table.Cell>

                  <Table.Cell>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {report.status}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    {new Date(
                      report.createdAt
                    ).toLocaleDateString()}
                  </Table.Cell>

                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}