import img from "@/assets/player.svg";
import StatCard from "@/components/custom/statistics-card";
import { MdStadium } from "react-icons/md";

import { FaUserTie } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import stadium from "@/assets/stadium.png";
import appstore from "@/assets/appstore.png";
import googleplay from "@/assets/googleplay.png";
import Title from "@/components/custom/title";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { useGetData } from "@/hooks/useGetData";
import { useEffect, useState } from "react";
interface Location {
	latitude: number | null;
	longitude: number | null;
}

function Webpage() {
	const [location, setLocation] = useState<Location>({
		latitude: null,
		longitude: null,
	});

	const { data, isLoading } = useGetData(
		`statistic/web/for/stadium-count?lat=${location?.latitude || 0}&lang=${
			location?.longitude || 0
		}`,
	);
	console.log(isLoading ? "Loading" : data.data);

	const { data: nearStadium, isLoading: isLoadingStadium } = useGetData(
		`statistic/web/for/radiusBy-stadiumCount?lat=${location?.latitude}&lang=${location?.longitude}`,
	);

	useEffect(() => {
		const getUserLocation = () => {
			if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition((position) => {
					setLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
				});
			}
		};

		getUserLocation();
	}, []);

	const words = `	Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eaque assumenda repellat voluptas laborum qui quas, quos perspiciatis facilis eius sapiente accusantium necessitatibus veniam amet possimus id dolor harum aut! Incidunt maiores necessitatibus tenetur aliquid distinctio at iste ut? Facilis quibusdam cumque aliquam, at dolor obcaecati est qui consectetur nihil!`;

	const stats = [
		{
			icon: <MdStadium />,
			title: "Bo'sh stadionlar",
			dataKey: data?.data?.todayOrderNullStadiumCount || 0,
		},
		{
			icon: <RiMoneyDollarCircleLine />,
			title: "O'rtacha narxi",
			dataKey: data?.data?.stadiumPriceAvgCount || 0,
		},
		{
			icon: <RiMoneyDollarCircleLine />,
			title: "Mijozlar soni",
			dataKey: data?.data?.clientCount || 0,
		},
		{
			icon: <FaUserTie />,
			title: "Stadion egalari",
			dataKey: data?.data?.masterCountAll || 0,
		},
		{
			icon: <FaUserTie />,
			title: "Stadionlar umumiy soni",
			dataKey: data?.data?.stadiumCount || 0,
		},
	];

	return (
		<>
			<div
				id="home"
				className="w-[98%] mx-auto h-[55vw] md:h-[35vw] max-800:h-auto my-8 max-800:block max-800:text-center container px-4 flex items-center">
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
			<div
				className="py-8"
				id="stat">
				<Title
					text="Statistics"
					className="mb-4 text-center"
				/>
				<div className="w-[95%]  flex flex-wrap max-520:block container justify-center gap-16 mx-auto mt-[20px]">
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
			<APIProvider apiKey={"AIzaSyA7hQst-XJ1zOl63vgDEfOI05ec3boIPms"}>
				{location.latitude && location.longitude && (
					<Map
						style={{ height: "80vh", width: "100%", margin: "50px auto" }}
						mapId={"AIzaSyA7hQst-XJ1zOl63vgDEfOI05ec3boI"}
						zoom={15}
						zoomControl={true}
						center={{
							lat: location.latitude,
							lng: location.longitude,
						}}>
						{isLoadingStadium ? (
							<div>Loading nearby stadiums...</div>
						) : nearStadium?.data?.length === 0 ? (
							<div className="text-red-500 text-2xl my-4 w-full text-center">
								Sizga yaqin bo'lgan stadionlar topilmadi!
							</div>
						) : (
							<>
								{nearStadium.data.map(
									(
										stad: { stadiumName: string; lat: number; lang: number },
										i: number,
									) => (
										<AdvancedMarker
											key={i}
											position={{
												lat: stad.lat,
												lng: stad.lang,
											}}>
											<MdStadium
												fontSize={30}
												color="green"
											/>
											<h1 className="text-black font-bold text-xl">
												{stad.stadiumName}
											</h1>
										</AdvancedMarker>
									),
								)}
								<AdvancedMarker
									position={{
										lat: location.latitude,
										lng: location.longitude,
									}}>
									<IoPerson
										color="green"
										fontSize={50}
									/>
									<h1 className="text-xl">You</h1>
								</AdvancedMarker>
								<div className="text-black font-bold text-2xl w-full text-center my-2">
									Sizga yaqin bo'lgan stadionlar soni {nearStadium.data.length}
								</div>
							</>
						)}
					</Map>
				)}
			</APIProvider>

			<div
				id="about"
				className="my-[50px] max-800:my-[2vw] container mx-auto">
				<Title
					text="About Us"
					className="text-center"
				/>
				<div className="w-[90%] mx-auto max-800:my-4 flex justify-around max-800:flex-col-reverse items-center">
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
								alt="Google Play Store"
							/>
						</a>
						<a
							href="#"
							className="transition hover:scale-105">
							<img
								src={appstore}
								className="w-full"
								alt="Apple App Store"
							/>
						</a>
					</div>
				</div>
			</div>
		</>
	);
}

export default Webpage;
