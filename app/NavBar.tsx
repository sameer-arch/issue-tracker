"use client";
import {
	Avatar,
	Box,
	Container,
	DropdownMenu,
	Flex,
	Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { Skeleton } from "@/app/components";
const NavBar = () => {
	return (
		<nav className=" mb-5 border-b px-5 py-3">
			<Container>
				{" "}
				<Flex justify="between">
					<Flex align="center" gap="3">
						<Link href="/">
							<AiFillBug />
						</Link>
						<NavLinks />
					</Flex>
					<AuthStatus />
				</Flex>
			</Container>
		</nav>
	);
};
const NavLinks = () => {
	const currentPath = usePathname();
	const links = [
		{ href: "/", label: "Dashboard" },
		{ href: "/issues/list", label: "Issues" },
	];
	return (
		<ul className="flex space-x-6">
			{links.map((link) => (
				<li key={link.href}>
					<Link
						href={link.href}
						className={classNames({
							"nav-link": true,
							"!text-zinc-900": currentPath === link.href,
						})}
						// {`${
						// currentPath === link.href ? "text-zinc-900" : "text-zinc-500"
						// } hover:text-zinc-800 transition-colors`}
					>
						{link.label}
					</Link>
				</li>
			))}
		</ul>
	);
};

const AuthStatus = () => {
	const { status, data: session } = useSession();

	if (status === "loading") return <Skeleton width="3rem" />;
	if (status === "unauthenticated")
		return (
			<Link className="nav-link" href="/api/auth/signin">
				Login
			</Link>
		);
	return (
		<Box>
			{status === "authenticated" && (
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar
							src={session.user!.image!}
							fallback="?"
							size="2"
							radius="full"
							className="cursor-pointer"
							referrerPolicy="no-referrer"
						/>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Label>
							<Text size="2">{session.user?.email}</Text>
						</DropdownMenu.Label>
						<DropdownMenu.Item>
							<Link href="/api/auth/signout">Log out</Link>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			)}
		</Box>
	);
};
export default NavBar;
