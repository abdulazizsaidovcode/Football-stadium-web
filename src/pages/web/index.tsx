import img from "@/assets/player.svg";
import StatCard from "@/components/custom/statistics-card";
import { MdStadium } from "react-icons/md";

import { FaUserTie } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import stadium from "@/assets/stadium.png";
import appstore from "@/assets/appstore.png";
import googleplay from "@/assets/googleplay.png";
import Title from "@/components/custom/title";
import { useGetData } from "@/hooks/useGetData";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import MapComponent from "@/pages/web/map-container";
import { useQuery } from "@tanstack/react-query";
import instance from "@/server/config";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { LabelInputContainer } from "@/components/ui/label";
// import * as Location from "expo-location"; // Import Location from expo-location
function Webpage() {
	const [location, setLocation] = useState({
		latitude: 38.8470951,
		longitude: 65.79399,
	});
	const [permissionStatus, setPermissionStatus] = useState("unknown");
	console.log(permissionStatus);
	useEffect(() => {
		navigator.permissions
			.query({ name: "geolocation" })
			.then((result) => {
				setPermissionStatus(result.state);
				result.onchange = () => {
					setPermissionStatus(result.state);
					console.log(permissionStatus);
				};
			})
			.catch((err) => {
				console.error("Error checking permission:", err);
			});
	}, [permissionStatus]);

	const requestLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
				},

				() => {
					alert(
						"Brauser cannot access your location get from an unsecure website",
					);
				},
			);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
		console.log(location);
	};

	const { data } = useGetData(
		`statistic/web/for/stadium-count?lat=${location?.latitude || 0}&lang=${
			location?.longitude || 0
		}`,
	);

	const [km, setKm] = useState(10);

	const { data: nearStadium, isLoading } = useQuery({
		queryKey: ["nearStadium", km],
		queryFn: async () => {
			const response = await instance.get(
				`statistic/web/for/radiusBy-stadiumCount?lat=${location.latitude}&lang=${location.longitude}&nextToMe=${km}`,
			);
			return response.data.data;
		},
	});

	interface Inputs {
		km: string;
	}
	const { register, handleSubmit } = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		setKm(Number(data.km));
	};

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
			<div className="w-[90%] flex justify-center items-center gap-4 mx-auto max-800:block">
				<div className="text-2xl font-bold md:min-w-fit  max-800:text-center">
					Write distance
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex items-center gap-4 max-800:my-6">
					<LabelInputContainer>
						<Input
							className="text-xl"
							type="text"
							{...register("km")}
						/>
					</LabelInputContainer>
					<button
						className="text-md font-bold px-2 py-1 rounded-md w-28 border border-gray-400 bg-black text-white hover:text-black hover:bg-inherit transition-all "
						type="submit">
						Submit
					</button>
				</form>
			</div>
			<div className="w-[90%] mx-auto text-2xl font-bold text-center my-4">
				{isLoading
					? "Loading"
					: nearStadium.length > 0
					? `Sizga yaqin boshlang'ich ${km} km da ${nearStadium.length} ta stadion topildi`
					: `Sizga yaqin boshlang'ich ${km} km da stadion topilmadi`}
			</div>
			<div className="w-[95%] flex justify-end">
				<button
					onClick={requestLocation}
					className="text-md font-bold px-2 py-1 rounded-md border border-gray-400 bg-black text-white hover:text-black hover:bg-inherit transition-all ">
					Get Coordinates
				</button>
			</div>
			<div className="overflow-hidden w-[90%] relative h-[50vh] my-[20px] mx-auto">
				<MapComponent
					km={km}
					location={location}
					data={nearStadium}
				/>
			</div>
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
