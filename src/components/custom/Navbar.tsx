import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import Logo from "@/assets/icon.png";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navItems = [
		{
			title: "Bosh sahifa",
			id: "home",
		},
		{
			title: "Statistikalar",
			id: "stat",
		},
		{
			title: "Biz haqimizda",
			id: "about",
		},
		{
			title: "Ilovani yuklash",
			id: "download",
		},
	];

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className="shadow-lg border-b w-full flex justify-between items-center p-4 bg-gray-100">
			<div className="md:w-[10%] w-[20vw]">
				<img
					className="w-full"
					src={Logo}
					alt="web logo"
				/>
			</div>
			<ul className="hidden md:flex space-x-6">
				{navItems.map((item) => (
					<li
						key={item.id}
						className="text-black text-lg font-semibold md:hover:text-green-400 md:hover:scalex-110 transition-all md:hover:cursor-pointer">
						<a href={`#${item.id}`}>{item.title}</a>
					</li>
				))}
			</ul>
			<div className="md:hidden z-50">
				{isMenuOpen ? (
					<MdClose
						className="text-3xl cursor-pointer"
						onClick={toggleMenu}
					/>
				) : (
					<MdMenu
						className="text-3xl cursor-pointer"
						onClick={toggleMenu}
					/>
				)}
			</div>
			<div
				className={`${
					isMenuOpen ? "translate-y-0" : "-translate-y-[100%]"
				} fixed top-0 right-0 w-full h-screen bg-gray-100 text-black z-100 md:hidden flex flex-col items-center justify-center space-y-6 transform transition-transform duration-300 ease-in-out z-40`}>
				<ul className="flex flex-col items-center space-y-6">
					{navItems.map((item) => (
						<li
							key={item.id}
							className="text-lg font-semibold md:hover:text-green-400 transition-all">
							<a
								href={`#${item.id}`}
								onClick={toggleMenu}>
								{item.title}
							</a>
						</li>
					))}
				</ul>
				<button className="px-8 py-3 bg-black text-white text-xl rounded-md font-semibold md:hover:bg-green-400 transition">
					Bog'lanish
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
