import React, { useEffect, useState } from "react";
import { IconBrandTabler, IconUsers, IconUserBolt } from "@tabler/icons-react";
import { FaRegUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { BiMenuAltRight, BiMenuAltLeft } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import LogOutModal from "@/components/custom/logout-modal";
import FormModal from "@/components/custom/form-modal";
import { useGetData } from "@/hooks/useGetData";

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

	const [title, setTitle] = useState("Dashboard");

	const [open, setOpen] = useState(true);

	const [activeLink, setActiveLink] = useState(location.pathname);
	useEffect(() => {
		setActiveLink(location.pathname);
	}, [location.pathname]);
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
							setTitle(root.label);
							navigate(root.href);
						}}>
						<span className="p-4">{root.icon}</span> {root.label}
					</button>
				))}
			</div>
			<Panel title={title}>{children}</Panel>
		</div>
	);
}

const Panel = ({
	children,
	title,
}: {
	children: React.ReactNode;
	title: string;
}) => {
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

	const { data: MeData, isLoading } = useGetData("user/me");

	const logOutFunction = () => {
		navigate("/signin");
		Cookies.remove("auth_token");
		localStorage.removeItem("clientPage");
		localStorage.removeItem("confirmedPage");
		localStorage.removeItem("notMaster");
		localStorage.removeItem("notMasterPage");
	};

	return (
		<div className="bg-white w-full h-full">
			<div className="bg-gray-100 flex transition-all duration-300 justify-between items-center p-5 mb-4">
				<h1>{title}</h1>
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
							dropdown ? "h-[120px]" : "h-0"
						} bg-gray-100 z-50 absolute right-0 top-[50px] rounded-sm`}>
						<li>
							<FormModal data={isLoading ? null : MeData.data} />
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
