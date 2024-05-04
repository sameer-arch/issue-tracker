import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetail = ({ issue }: { issue: Issue }) => {
	return (
		<>
			{" "}
			<Heading>{issue?.title}</Heading>
			<Flex gap="3" my="2">
				<IssueStatusBadge status={issue.status} />
				<Text>{issue?.createdAt.toDateString()}</Text>
			</Flex>
			<Card mt="4" className="prose">
				<ReactMarkdown>{issue?.description}</ReactMarkdown>
			</Card>
		</>
	);
};

export default IssueDetail;
