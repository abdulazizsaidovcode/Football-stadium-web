import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navItems = [
		{
			title: "Home",
			id: "home",
		},
		{
			title: "Statistics",
			id: "stat",
		},
		{
			title: "About Us",
			id: "about",
		},
		{
			title: "Download App",
			id: "download",
		},
	];

	// Menu toggle function
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className="shadow-lg border">
			<ul className="container mx-auto justify-end bg-gray-100 p-4 py-8 hidden md:flex">
				{navItems.map((item) => (
					<li
						key={item.id}
						className="text-black text-lg mr-6 font-semibold hover:text-green-400 hover:scale-110 transition-all hover:cursor-pointer">
						<a href={`#${item.id}`}>{item.title}</a>
					</li>
				))}
			</ul>

			<div className="flex justify-end p-4 md:hidden z-50 relative bg-gray-100">
				{isMenuOpen ? (
					<MdClose
						className="text-3xl cursor-pointer z-50 relative"
						onClick={toggleMenu}
					/>
				) : (
					<MdMenu
						className="text-3xl cursor-pointer z-50 relative"
						onClick={toggleMenu}
					/>
				)}
			</div>

			<div
				className={`${
					isMenuOpen ? "translate-y-0" : "-translate-y-full"
				} fixed top-0 left-0 w-full bg-gray-100 transition-transform duration-500 ease-in-out z-40`}>
				<ul className="flex flex-col items-center max-800:h-[100vh] py-4 mt-16">
					{navItems.map((item) => (
						<li
							key={item.id}
							className="text-black text-lg my-2 font-semibold hover:text-green-400 hover:scale-110 transition-all hover:cursor-pointer">
							<a
								href={`#${item.id}`}
								onClick={toggleMenu}>
								{item.title}
							</a>
						</li>
					))}
					<button className="px-[8vw] py-[1vw] hover:scale-110 bg-black text-white text-xl rounded-md font-semibold hover:bg-green-400 transition hover:shadow-lg md:hidden block mt-8">
						Contact Us
					</button>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
