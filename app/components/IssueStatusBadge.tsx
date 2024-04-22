import React from "react";
import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
	Status,
	{ label: Status; color: "red" | "violet" | "green" }
> = {
	OPEN: { label: "OPEN", color: "red" },
	CLOSED: { label: "CLOSED", color: "green" },
	IN_PROGRESS: { label: "IN_PROGRESS", color: "violet" },
};

interface Props {
	status: Status;
}
const IssueStatusBadge = ({ status }: { status: Status }) => {
	return (
		<Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
	);
};

export default IssueStatusBadge;
