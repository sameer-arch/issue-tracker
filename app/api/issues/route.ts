import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const issueSchema = z.object({
	title: z.string().min(3),
	description: z.string(),
});

export async function POST(requrst: NextRequest) {
	const body = await requrst.json();
	const validation = issueSchema.safeParse(body);

	if (!validation.success)
		return NextResponse.json(validation.error.errors, { status: 400 });

	const newIssue = await prisma.issue.create({
		data: { title: body.title, description: body.description },
	});
	return NextResponse.json(newIssue, { status: 201 });
}
