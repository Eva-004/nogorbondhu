
"use client";

import React, { useState } from "react";
import { Table } from "@heroui/react";
import AuthorityReportModal from "./AuthorityReportModal";

const ProblemVerifyTable = ({ reports}) => {

    const priorityColors = {
        critical: "badge-error",
        high: "badge-warning",
        medium: "badge-info",
        low: "badge-success",
    };

   

    return (
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-4 md:p-5">
            <Table>
                <Table.ScrollContainer>
                    <Table.Content
                        className="min-w-[850px]"
                        aria-label="Reports under review"
                    >
                        <Table.Header className="bg-[#0F6848]">
                            <Table.Column isRowHeader className="text-white">
                                Report ID
                            </Table.Column>
                            <Table.Column className="text-white">
                                Problem
                            </Table.Column>
                            <Table.Column className="text-white">
                                Category
                            </Table.Column>
                            <Table.Column className="text-white">
                                Report Date
                            </Table.Column>
                            <Table.Column className="text-white">
                                Priority
                            </Table.Column>
                            <Table.Column className="text-white">
                                Status
                            </Table.Column>
                            <Table.Column className="text-white">
                                Action
                            </Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {reports.length > 0 ? (
                                reports.map((report) => (
                                    <Table.Row key={report._id}>
                                        <Table.Cell>
                                            {report._id.slice(-8)}
                                        </Table.Cell>

                                        <Table.Cell>
                                            {report.title}
                                        </Table.Cell>

                                        <Table.Cell>
                                            {report.category?.name || "—"}
                                        </Table.Cell>

                                        <Table.Cell>
                                            {report.createdAt
                                                ? new Date(report.createdAt).toLocaleDateString()
                                                : "—"}
                                        </Table.Cell>

                                        <Table.Cell>
                                            <span
                                                className={`badge badge-soft ${
                                                    priorityColors[
                                                        report.priority?.toLowerCase()
                                                    ] || "badge-ghost"
                                                }`}
                                            >
                                                {report.priority?.toUpperCase() || "—"}
                                            </span>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <span className="badge badge-soft badge-info">
                                                Under Review
                                            </span>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <AuthorityReportModal report={report} />
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row>
                                    <Table.Cell colSpan={7}>
                                        <div className="py-10 text-center text-sm text-[#81958A]">
                                            No reports under review found.
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default ProblemVerifyTable;
