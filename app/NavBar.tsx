"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
	const links = [
		{ href: "/", label: "Dashboard" },
		{ href: "/issues/list", label: "Issues" },
	];

	const currentPath = usePathname();
	return (
		<nav className="flex mb-5 space-x-6 border-b h-14 items-center px-5">
			<Link href="/">
				<AiFillBug />
			</Link>
			<ul className="flex space-x-6">
				{links.map((link) => (
					<Link
						key={link.href}
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
				))}
			</ul>
		</nav>
	);
};

export default NavBar;
