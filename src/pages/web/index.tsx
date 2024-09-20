import img from "../../assets/player.svg";
import StatCard from "../../components/custom/statistics-card";
import { MdStadium } from "react-icons/md";
import { FaUsers, FaUserTie } from "react-icons/fa";
import { TextGenerateEffect } from "../../components/ui/text-generate-effect";
import stadium from "../../assets/stadium.png";
import appstore from "../../assets/appstore.png";
import googleplay from "../../assets/googleplay.png";
import Title from "../../components/custom/title";
function Webpage() {
	const words = `
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, cum
		repudiandae. Nisi id, neque ex perspiciatis laudantium officiis
		eveniet nulla, accusantium doloremque at sunt architecto sint,
		corrupti dolorum quaerat quos! Perspiciatis qui, perferendis
		suscipit tenetur minima eos, obcaecati a incidunt officiis vero in
		praesent
	`;

	const stats: { icon: JSX.Element; title: string; dataKey: number }[] = [
		{
			icon: <FaUsers />,
			title: "Users",
			dataKey: 60,
		},
		{
			icon: <MdStadium />,
			title: "Stadiums",
			dataKey: 80,
		},
		{
			icon: <FaUserTie />,
			title: "Stadium Owners",
			dataKey: 90,
		},
	];

	return (
		<>
			<div
				id="home"
				className="w-[95%] mx-auto max-800:block max-800:text-center container px-4 my-8 flex items-center">
				<div className="w-[50vw] max-800:w-full max-800:mx-auto">
					<Title text="Football Stadiums" />
					<div className="my-6">
						<TextGenerateEffect words={words} />
					</div>

					<button className="hidden md:block px-[8vw] py-[1vw] hover:scale-110 bg-black text-white text-xl rounded-md font-semibold hover:bg-green-400 transition hover:shadow-lg">
						Contact Us
					</button>
				</div>
				<div className="w-[50%] max-800:w-[80%] max-800:mx-auto max-800:mt-5 ">
					<img
						src={img}
						className="w-full"
						alt="player"
					/>
				</div>
			</div>
			<div className="mt-8">
				<Title
					text="Statistics"
					className="text-center"
				/>
				<div
					id="stat"
					className="w-[95%] max-800:flex-wrap max-520:block container justify-between flex px-[50px] mx-auto mt-[20px] min-h-[200px]">
					{stats.map((stat, i) => (
						<StatCard
							key={i}
							icon={stat.icon}
							number={stat.dataKey}
							title={stat.title}
						/>
					))}
				</div>
			</div>
			<div
				id="about"
				className="my-[50px] max-800:my-[2vw] container mx-auto">
				<Title
					text="About Us"
					className="text-center"
				/>
				<div className="w-[90%] mx-auto my-20 max-800:my-4 flex justify-around max-800:flex-col-reverse items-center">
					<TextGenerateEffect
						className="w-[44%] max-800:w-full max-800:text-center"
						words={`Xush kelibsiz! Biz, IT CITY jamoasi, futbol stadionlarini qulay va samarali tarzda band qilish bo'yicha mutaxassislarimiz. Bizning maqsadimiz — sizga stadion band qilish jarayonini soddalashtirish va maksimal darajada qulaylik yaratishdir.`}
					/>
					<div className="w-[30%] max-800:w-[80%] max-800:my-4 overflow-hidden hover:scale-105 transition rounded-xl">
						<img
							className="w-full"
							src={stadium}
							alt="stadium image in about us"
						/>
					</div>
				</div>
			</div>
			<div
				id="download"
				className="w-full p-[20px] mt-[20px] bg-green-400">
				<div className="w-[90%] mx-auto p-4 flex justify-evenly max-800:block items-center">
					<Title
						text="Download APP"
						className="max-800:text-center max-800:mb-[4vw]"
					/>
					<div className="flex justify-between gap-2 w-[30%] max-800:w-[90%] max-800:mx-auto">
						<a
							href="#"
							className="transition hover:scale-105">
							<img
								src={googleplay}
								className="w-full"
								alt="google play image"
							/>
						</a>
						<a
							href="#"
							className="transition hover:scale-105">
							<img
								src={appstore}
								className="w-full"
								alt="app store image"
							/>
						</a>
					</div>
				</div>
			</div>
		</>
	);
}

export default Webpage;
