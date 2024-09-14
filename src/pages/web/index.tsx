import img from "../../assets/player.svg";
import StatCard from "../../components/custom/statistics-card";
import { MdStadium } from "react-icons/md";
import { FaUsers, FaUserTie } from "react-icons/fa";
import { TextGenerateEffect } from "../../components/ui/text-generate-effect";
import stadium from "../../assets/stadium.png";
import appstore from "../../assets/appstore.png";
import googleplay from "../../assets/googleplay.png";
export interface StatType {
	icon: JSX.Element;
	number: string;
	title: string;
}

function Webpage() {
	const words = `
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, cum
						repudiandae. Nisi id, neque ex perspiciatis laudantium officiis
						eveniet nulla, accusantium doloremque at sunt architecto sint,
						corrupti dolorum quaerat quos! Perspiciatis qui, perferendis
						suscipit tenetur minima eos, obcaecati a incidunt officiis vero in
						praesent
	`;
	const stats: StatType[] = [
		{
			icon: <FaUsers />,
			number: "5150",
			title: "Users",
		},
		{ icon: <MdStadium />, number: "21", title: "Stadium" },
		{ icon: <FaUserTie />, number: "50", title: "Stadium Owners" },
	];
	return (
		<div className="">
			<div id="home" className="w-[90%] container  px-4 mx-auto  mt-8 flex items-center">
				<div className="w-[50%] ">
					<h1 className="font-bold text-5xl transition hover:scale-110">
						Football Stadiums
					</h1>
					<div className="text-xl my-6">
						<TextGenerateEffect words={words} />
					</div>

					<button className="px-20 py-3 hover:scale-110 bg-black text-white text-xl rounded-md font-semibold hover:bg-green-400 transition hover:shadow-lg">
						Contact Us
					</button>
				</div>
				<div className="w-[50%] ">
					<img
						src={img}
						className="w-full"
						alt="player"
					/>
				</div>
			</div>
			<div id="stat" className="w-[80%] container justify-between flex p-[50px] mx-auto mt-[50px] min-h-[200px]">
				{stats.map((stat) => (
					<StatCard
						icon={stat.icon}
						number={stat.number}
						title={stat.title}
					/>
				))}
			</div>
			<div id="about" className="my-[50px] container mx-auto">
				<h1 className="flex transition hover:scale-105 justify-center font-bold text-5xl mb-6">
					ABOUT US
				</h1>
				<div className="w-[90%] mx-auto my-20 flex justify-around items-center">
					<h3 className="w-[42%]  text-left text-2xl">
						Xush kelibsiz! Biz, IT CITY jamoasi, futbol stadionlarini qulay va
						samarali tarzda band qilish bo'yicha mutaxassislarimiz. Bizning
						maqsadimiz — sizga stadion band qilish jarayonini soddalashtirish va
						maksimal darajada qulaylik yaratishdir.
					</h3>
					<div className="w-[30%] overflow-hidden hover:scale-105 transition rounded-xl">
						<img
							className="w-full"
							src={stadium}
							alt="stadium image in about us"
						/>
					</div>
				</div>
			</div>
			<div id="download" className="w-full p-[20px] mt-[20px] bg-green-400">
				<div className="container w-[90%] mx-auto p-4 flex justify-evenly items-center">
					<h1 className="text-4xl font-bold transition hover:scale-110">Download APP</h1>
					<div className="flex gap-2 ">
						<a
							href="#"
							className="transition hover:scale-105">
							<img
								src={googleplay}
								alt="google play image"
							/>
						</a>
						<a
							href="#"
							className="transition hover:scale-105">
							<img
								src={appstore}
								alt="app store image"
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Webpage;
