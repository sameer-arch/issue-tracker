import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import { Link, IssueStatusBadge } from "@/app/components";
import IssuesActions from "./IssuesActions";
import { Issue, Status } from "@prisma/client";
import { object } from "zod";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";
import IssueTable, { columnsNames, SearchParams } from "./IssueTable";
const IssuePage = async ({ searchParams }: { searchParams: SearchParams }) => {
	const statuses = Object.values(Status);
	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined;

	const orderBy = columnsNames.includes(searchParams.orderBy)
		? { [searchParams.orderBy]: "asc" }
		: undefined;
	const where = { status };
	const page = parseInt(searchParams.page) || 1;
	const pageSize = 10;

	const issues = await prisma.issue.findMany({
		where,
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize,
	});
	const issueCount = await prisma.issue.count({ where });
	return (
		<Flex direction="column" gap="3">
			<IssuesActions />
			<IssueTable issues={issues} searchParams={searchParams} />
			<Pagination
				pageSize={pageSize}
				currentPage={page}
				itemsCount={issueCount}
			/>
		</Flex>
	);
};
export const dynamic = "force-dynamic";
export default IssuePage;
