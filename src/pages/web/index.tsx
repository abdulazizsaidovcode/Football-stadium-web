import img from "@/assets/player.svg";
import StatCard from "@/components/custom/statistics-card";
import { MdStadium } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { MdOutlineStadium } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
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
function Webpage() {
	const [location, setLocation] = useState({
		latitude: 39.6525568,
		longitude: 66.9581312,
	});
	const requestLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					console.log(
						"🚀 ~ requestLocation ~ position:",
						position.coords.latitude,
					);
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
	};
	useEffect(() => {
		requestLocation();
		getStadium();
	}, []);

	const { data } = useGetData(
		`statistic/web/for/stadium-count?lat=${location?.latitude || 0}&lang=${
			location?.longitude || 0
		}`,
	);

	const [km, setKm] = useState(10);

	const getStadium = async () => {
		const response = await instance.get(
			`statistic/web/for/radiusBy-stadiumCount?lat=${location.latitude}&lang=${location.longitude}&nextToMe=${km}`,
		);
		return response.data.data;
	};

	const { data: nearStadium, isLoading } = useQuery({
		queryKey: ["nearStadium", km],
		queryFn: getStadium,
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
			icon: <MdOutlineStadium />,
			title: "Bo'sh stadionlar",
			dataKey: data?.data?.todayOrderNullStadiumCount || 0,
		},
		{
			icon: <RiMoneyDollarCircleLine />,
			title: "Stadionlarni o'rtacha narxi",
			dataKey: data?.data?.stadiumPriceAvgCount || 0,
		},
		{
			icon: <FaUsers />,
			title: "Mijozlar soni",
			dataKey: data?.data?.clientCount || 0,
		},
		{
			icon: <FaUserTie />,
			title: "Stadion egalari",
			dataKey: data?.data?.masterCountAll || 0,
		},
		{
			icon: <MdStadium />,
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
					<Title text="Sfera Stadium" />
					<div className="my-6">
						<div className="mt-4">
							<div className=" dark:text-white text-black text-[1.5vw] max-800:text-[3vw] max-520:text-[4vw] leading-snug tracking-wide">
								{words}
							</div>
						</div>
					</div>
					<button className="hidden md:block px-[8vw] py-[1vw] md:hover:scale-110 bg-black text-white text-xl rounded-md font-semibold md:hover:bg-green-400 transition md:hover:shadow-lg">
						Bog'lanish
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
					text="Statistikalar"
					className="mb-4 text-center"
				/>
				<div className="w-[95%]  flex flex-wrap max-520:block container justify-center md:gap-16 mx-auto mt-[20px]">
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
					Masofani kirgazing
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
						className="text-md font-bold px-2 py-1 rounded-md w-28 border border-gray-400 bg-black text-white md:hover:text-black md:hover:bg-inherit transition-all "
						type="submit">
						Yuborish
					</button>
				</form>
			</div>
			<div className="w-[90%] mx-auto text-2xl font-bold text-center my-4">
				{isLoading ? (
					"Loading"
				) : nearStadium.length > 0 ? (
					<>
						<p>
							Sizga yaqin boshlang'ich {km} km da {nearStadium.length} ta
							stadion topildi, joyingizni band qilish uchun{" "}
							<strong style={{ color: "green" }}>ilovani yuklab oling</strong> !
						</p>
						<div className="flex justify-center gap-2 w-[80%] mx-auto my-[4vw]">
							<a
								href="#"
								className="transition md:hover:scale-105">
								<img
									src={googleplay}
									className="w-full"
									alt="Google Play Store"
								/>
							</a>
							<a
								href="#"
								className="transition md:hover:scale-105">
								<img
									src={appstore}
									className="w-full"
									alt="Apple App Store"
								/>
							</a>
						</div>
					</>
				) : (
					`Sizga yaqin boshlang'ich ${km} km da stadion topilmadi, boshqa masofani kirgazing !`
				)}
			</div>
			<div className="w-[95%] flex justify-end">
				<button
					onClick={requestLocation}
					className="text-md font-bold px-2 py-1 rounded-md border border-gray-400 bg-black text-white md:hover:text-black md:hover:bg-inherit transition-all ">
					Manzilni aniqlash
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
					text="Biz haqimizda"
					className="text-center"
				/>
				<div className="w-[90%] mx-auto max-800:my-4 flex justify-around max-800:flex-col-reverse items-center">
					<TextGenerateEffect
						className=""
						words={``}
					/>

					<div className="w-[44%] max-800:w-full max-800:text-center">
						<div className="mt-4">
							<div className=" dark:text-white text-black text-[1.5vw] max-800:text-[3vw] max-520:text-[4vw] leading-snug tracking-wide">
								Xush kelibsiz! Biz, IT CITY jamoasi, futbol stadionlarini qulay
								va samarali tarzda band qilish bo'yicha mutaxassislarimiz.
								Bizning maqsadimiz — sizga stadion band qilish jarayonini
								soddalashtirish va maksimal darajada qulaylik yaratishdir.
							</div>
						</div>
					</div>
					<div className="w-[30%] max-800:w-[80%] max-800:my-4 overflow-hidden md:hover:scale-105 transition rounded-xl">
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
						text="Ilovani yuklash"
						className="max-800:text-center max-800:mb-[4vw]"
					/>
					<div className="flex justify-between gap-2 w-[30%] max-800:w-[90%] max-800:mx-auto">
						<a
							href="#"
							className="transition md:hover:scale-105">
							<img
								src={googleplay}
								className="w-full"
								alt="Google Play Store"
							/>
						</a>
						<a
							href="#"
							className="transition md:hover:scale-105">
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
