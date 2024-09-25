import { StatType } from "@/constants/types";
const StatCard = ({ icon, number, title }: StatType) => {
	return (
		<div className="w-[22%] max-800:w-[45%] max-520:w-[90%] max-800:mb-[50px] max-800:mx-auto md:hover:scale-110 transition text-center cursor-pointer p-8 border rounded-lg shadow-md flex flex-col items-center">
			<div className="text-[4vw] max-800:text-[6vw] max-520:text-[12vw] mb-2 text-green-400">
				{icon}
			</div>
			<h4 className="text-[4vw] max-800:text-[6vw] max-520:text-[12vw] font-semibold mb-4">
				{number}
			</h4>
			<h3 className="text-[1.5vw] max-800:text-[3vw] max-520:text-[6vw] font-bold">
				{title}
			</h3>
		</div>
	);
};
export default StatCard;
