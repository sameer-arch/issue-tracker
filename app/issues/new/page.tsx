"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
// import SimpleMDE from "react-simplemde-editor";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { createIssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RxInfoCircled } from "react-icons/rx";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
	ssr: false,
});
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
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
