import { StatType } from "../../pages/web";

const StatCard = ({ icon, number, title }: StatType) => {
	return (
		<div className="w-[30%] max-800:w-[45%] max-520:w-full max-800:mb-[50px] max-800:mx-auto hover:scale-110 transition text-center cursor-pointer p-8 border rounded-lg shadow-md flex flex-col items-center">
			<div className="text-[5vw] max-800:text-[8vw] mb-2 text-green-400">
				{icon}
			</div>
			<h4 className="text-[5vw] max-800:text-[8vw] font-semibold mb-4">
				{number}
			</h4>
			<h3 className="text-[1.8vw] max-800:text-[4vw] font-bold">{title}</h3>
		</div>
	);
};
export default StatCard;
