"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
	IconArrowLeft,
	IconBrandTabler,
	IconNotification,
} from "@tabler/icons-react";

import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { cn } from "../../lib/utils";
const logoStyle =
	"h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0  aaa";
export function SidebarComponent({
	children,
	title,
}: {
	children: React.ReactNode;
	title: string;
}) {
	const links = [
		{
			label: "Dashboard",
			href: "/admin/dashboard",
			icon: (
				<IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
			),
		},
		{
			label: "Notification",
			href: "/admin/notification",
			icon: (
				<IconNotification className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
			),
		},
		{
			label: "Logout",
			href: "#",
			icon: (
				<IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
			),
		},
	];
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<div
			className={cn(
				"rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
				"h-[100vh]",
			)}>
			<Sidebar
				open={open}
				setOpen={setOpen}>
				<SidebarBody
					title={title}
					className="justify-between gap-10">
					<div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
						{open ? <Logo /> : <LogoIcon />}
						<div className="mt-8 flex flex-col gap-2 ">
							{links.map((link) => (
								<Link
									onClick={() => {
										setOpen(false);
										navigate(link.href);
									}}
									to={link.href}
									key={link.label}>
									<SidebarLink link={link} />
								</Link>
							))}
						</div>
					</div>
					<div>
						<SidebarLink
							link={{
								label: "Manu Arora",
								href: "#",
								icon: (
									<img
										src="https://assets.aceternity.com/manu.png"
										className="h-7 w-7 flex-shrink-0 rounded-full"
										width={50}
										height={50}
										alt="Avatar"
									/>
								),
							}}
						/>
					</div>
				</SidebarBody>
			</Sidebar>
			<Panel>
				<h1 className="py-4 hidden md:block">{title}</h1>
				{children}
			</Panel>
		</div>
	);
}

export const Logo = () => {
	return (
		<a
			href="#"
			className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
			<div className={logoStyle} />
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="font-medium text-black dark:text-white whitespace-pre">
				Acet Labs
			</motion.span>
		</a>
	);
};

export const LogoIcon = () => {
	return (
		<a
			href="#"
			className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
			<div className={logoStyle} />
		</a>
	);
};

const Panel = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="p-2 md:px-10 bg-white md:rounded-xl w-full h-full overflow-y-scroll">
			{children}
		</div>
	);
};
