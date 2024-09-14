const Navbar = () => {
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

	return (
		<div className="shadow-lg sticky top-0 z-50">
			<ul className="container mx-auto flex justify-end bg-gray-100 w-30 p-4 py-8 ">
				{navItems.map((item) => (
					<li
						key={item.id}
						className="text-black mr-6 font-semibold hover:text-green-400 hover:scale-110 transition-all hover:cursor-pointer">
						<a href={`#${item.id}`}>{item.title}</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Navbar;
