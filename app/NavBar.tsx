"use client";
import { Box } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
const NavBar = () => {
	const currentPath = usePathname();
	const { status, data: session } = useSession();
	const links = [
		{ href: "/", label: "Dashboard" },
		{ href: "/issues/list", label: "Issues" },
	];

	return (
		<nav className="flex mb-5 space-x-6 border-b h-14 items-center px-5">
			<Link href="/">
				<AiFillBug />
			</Link>
			<ul className="flex space-x-6">
				{links.map((link) => (
					<li key={link.href}>
						<Link
							href={link.href}
							className={classNames({
								"text-zinc-900": currentPath === link.href,
								"text-zinc-500": currentPath !== link.href,
								"hover:text-zinc-800 transition-colors": true,
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
			<Box>
				{status === "authenticated" && (
					<Link href="/api/auth/signout">Log out</Link>
				)}
				{status === "unauthenticated" && (
					<Link href="/api/auth/signin">Login</Link>
				)}
			</Box>
		</nav>
	);
};

export default NavBar;
