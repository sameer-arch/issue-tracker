"use client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RxInfoCircled } from "react-icons/rx";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import { BiMessageError } from "react-icons/bi";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import delay from "delay";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = async () => {
	await delay(2000);
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema),
	});
	const router = useRouter();
	const [error, setError] = useState("");
	const [isSubmiting, setSubmiting] = useState(false);
	const onSubmit = handleSubmit(async (data) => {
		try {
			setSubmiting(true);
			await axios.post("/api/issues", data);
			router.push("/issues");
			console.log(isSubmiting);
		} catch (error) {
			setSubmiting(false);
			setError("An unexpected error has occurred");
		}
	});
	return (
		<div className="max-w-xl">
			{error && (
				<Callout.Root color="red" className="mb-5">
					<Callout.Icon>
						<RxInfoCircled />
					</Callout.Icon>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}{" "}
			<form className="space-y-3" onSubmit={onSubmit}>
				<TextField.Root placeholder="Title" {...register("title")} />
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					name="description"
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder="Description" {...field} />
					)}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>

				<Button disabled={isSubmiting}>
					Submit New Issue {isSubmiting && <Spinner />}
				</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
