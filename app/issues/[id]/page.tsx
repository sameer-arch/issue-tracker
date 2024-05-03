import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RxPencil2 } from "react-icons/rx";
import ReactMarkdown from "react-markdown";

interface Props {
	params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
	// if (typeof params.id !== "number") notFound();

	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(params.id) },
	});
	if (!issue) notFound();

	return (
		<Grid columns={{ initial: "1", md: "2" }} gap="5">
			<Box>
				{" "}
				<Heading>{issue?.title}</Heading>
				<Flex gap="3" my="2">
					<IssueStatusBadge status={issue.status} />
					<Text>{issue?.createdAt.toDateString()}</Text>
				</Flex>
				<Card mt="4" className="prose">
					<ReactMarkdown>{issue?.description}</ReactMarkdown>
				</Card>
			</Box>
			<Box>
				<Button>
					<RxPencil2 />
					<Link href={`/issue/${issue.id}/edit`}>Edit Issue</Link>
				</Button>
			</Box>
		</Grid>
	);
};

export default IssueDetailPage;
