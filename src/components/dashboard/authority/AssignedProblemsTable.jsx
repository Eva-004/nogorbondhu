import { Table } from "@heroui/react";

const AssignedProblemsTable = ({ reports }) => {
    const priorityColors = {
        critical: "badge-error",
        high: "badge-warning",
        medium: "badge-info",
        low: "badge-success",
    };
    const statusColors = {
        pending: "badge-warning",
        "under-review": "badge-info",
        "in-progress": "bg-purple-50 text-purple-700 border-purple-200",
        resolved: "badge-success",
    };
    return (
        <div className="p-4 md:p-5">
            <Table >
                <Table.ScrollContainer>
                    <Table.Content
                        className="min-w-[800px]" aria-label="reports data" >
                        <Table.Header className="bg-[#0F6848] " >
                            <Table.Column isRowHeader className={'text-white'} >Report ID</Table.Column>
                            <Table.Column className={'text-white'}>Problem</Table.Column>
                            <Table.Column className={'text-white'}>Category</Table.Column>
                            <Table.Column className={'text-white'}>Report Date</Table.Column>
                            <Table.Column className={'text-white'}>Priority</Table.Column>
                            <Table.Column className={'text-white'}>Status</Table.Column>
                            <Table.Column className={'text-white'}>Action</Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {reports.length > 0 ? (
                                reports.map((report) => (
                                    <Table.Row key={report._id}>
                                        <Table.Cell>{report._id}</Table.Cell>
                                        <Table.Cell>{report.title}</Table.Cell>
                                        <Table.Cell>{report.category?.name}</Table.Cell>
                                        <Table.Cell>
                                            {report.createdAt
                                                ? new Date(report.createdAt).toLocaleDateString()
                                                : "—"}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span className={`badge badge-soft ${priorityColors[report.priority?.toLowerCase()] || "badge-soft"}`}>
                                                {report.priority?.toUpperCase() || "—"}
                                            </span>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span
                                                className={`badge badge-soft ${statusColors[report.status?.toLowerCase()] || "badge-ghost"}`}
                                            >
                                                {report.status || "—"}
                                            </span>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <button
                                                type="button"
                                                className="font-medium text-[#0F6848] hover:underline"
                                            >
                                                View
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row>
                                    <Table.Cell colSpan={7}>
                                        <div className="py-10 text-center text-sm text-[#81958A]">
                                            No assigned reports found.
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

export default AssignedProblemsTable;