import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetailPage = () => {
	return (
		<Box>
			<Skeleton className="max-w-xl" />
			<Flex gap="3" my="2">
				<Skeleton width="5rem" />
				<Skeleton width="8rem" />
			</Flex>
			<Card mt="4" className="prose">
				<Skeleton count={3} />
			</Card>
		</Box>
	);
};

export default LoadingIssueDetailPage;
