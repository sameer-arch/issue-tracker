"use client";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RxInfoCircled } from "react-icons/rx";

interface IssueForm {
	title: string;
	description: string;
}
const NewIssuePage = () => {
	const { register, control, handleSubmit } = useForm<IssueForm>();
	const router = useRouter();
	const [error, setError] = useState("");

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
			<form
				className="space-y-3"
				onSubmit={handleSubmit(async (data) => {
					try {
						await axios.post("/api/issues", data);
						router.push("/issues");
					} catch (error) {
						// console.log(error);
						setError("An unexpected error has occurred");
					}
				})}
			>
				<TextField.Root placeholder="Title" {...register("title")} />

				<Controller
					name="description"
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder="Description" {...field} />
					)}
				/>
				<Button>Submit New Issue</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
