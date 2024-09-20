import React, { useEffect, useState } from "react";
import { IconBrandTabler, IconUsers, IconUserBolt } from "@tabler/icons-react";
import { FaRegUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import { MdNotificationsNone } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { BiMenuAltRight, BiMenuAltLeft } from "react-icons/bi";

import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import LogOutModal from "./logout-modal";

export function SidebarComponent({ children }: { children: React.ReactNode }) {
	const iconStyle =
		"hover:text-white dark:text-neutral-200 text-3xl flex-shrink-0";
	const roots = [
		{
			label: "Dashboard",
			href: "/admin/dashboard",
			icon: <IconBrandTabler className={iconStyle} />,
		},
		{
			label: "Masters",
			href: "/admin/masters",
			icon: <IconUserBolt className={iconStyle} />,
		},
		{
			label: "Clients",
			href: "/admin/clients",
			icon: <IconUsers className={iconStyle} />,
		},
	];
	const location = useLocation();
	console.log(location.pathname);

	const [open, setOpen] = useState(true);

	const [activeLink, setActiveLink] = useState(location.pathname);
	const navigate = useNavigate();

	return (
		<div
			className={cn(
				"rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
				"h-[100vh]",
			)}>
			<div
				className={cn(
					"transition-all duration-300 overflow-hidden",
					open ? "w-[300px]" : "w-[60px]",
				)}>
				<div className="flex justify-end pr-3">
					<div
						onClick={() => {
							setOpen(!open);
						}}
						className="max-w-fit cursor-pointer py-5">
						{open ? (
							<BiMenuAltLeft fontSize={30} />
						) : (
							<BiMenuAltRight fontSize={30} />
						)}
					</div>
				</div>
				{roots.map((root) => (
					<button
						key={root.label}
						className={cn("flex items-center w-full cursor-pointer gap-3", {
							"bg-gray-400 text-white": activeLink === root.href,
							"hover:bg-gray-400 hover:text-white": activeLink !== root.href,
						})}
						onClick={() => {
							setActiveLink(root.href);
							navigate(root.href);
						}}>
						<span className="p-4">{root.icon}</span> {root.label}
					</button>
				))}
			</div>
			<Panel>{children}</Panel>
		</div>
	);
}

const Panel = ({ children }: { children: React.ReactNode }) => {
	const [dropdown, setDropdown] = useState(false);
	const navigate = useNavigate();
	const handleClickOutside = () => {
		setDropdown(false);
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const logOutFunction = () => {
		navigate("/signin");
		Cookies.remove("auth-token");
	};

	return (
		<div className="bg-white w-full h-full">
			<div className="bg-gray-100 flex transition-all duration-300 justify-end p-5 mb-4">
				<div className="flex items-center relative">
					<span className="tex-xl font-bold">Admin</span>
					<button
						onClick={() => {
							setDropdown(!dropdown);
						}}
						className="flex items-center ml-4 transition-all">
						{dropdown ? (
							<>
								<FaRegUserCircle
									className="pr-2"
									fontSize={30}
								/>{" "}
								<FaChevronUp fontSize={15} />
							</>
						) : (
							<>
								<BsPersonCircle
									fontSize={30}
									className="pr-2"
								/>
								<FaChevronDown fontSize={15} />{" "}
							</>
						)}
					</button>
					<ul
						className={`w-[220px] overflow-hidden duration-500 text-xl text-left transition-all ${
							dropdown ? "h-[180px]" : "h-0"
						} bg-gray-100 z-50 absolute right-0 top-[50px] rounded-sm`}>
						<li className="p-4 flex items-center gap-2 hover:bg-gray-400 hover:text-white cursor-pointer">
							<BsPersonCircle />
							Account
						</li>
						<li className="p-4 flex items-center gap-2 hover:bg-gray-400 hover:text-white cursor-pointer">
							<MdNotificationsNone />
							Notification
						</li>
						<li>
							<LogOutModal
								basicFunction={() => {
									logOutFunction();
								}}
							/>
						</li>
					</ul>
				</div>
			</div>
			<div className="px-10">{children}</div>
		</div>
	);
};
