import { StadiumFeaturesType } from "@/constants/types";
import { FaCheck } from "react-icons/fa";
import { MdDoNotDisturb } from "react-icons/md";

const StadiumCard = ({
	stadium,
	className,
}: {
	stadium: StadiumFeaturesType;
	className?: string;
}) => {
	return (
		<div className={`${className}`}>
			<h3 className="text-black font-bold text-2xl">{stadium.name}</h3>
			<p className="text-sm text-gray-300  my-4">
				{stadium.description !== "string" && stadium.description !== null ? (
					stadium.description
				) : (
					<span className="text-red-800 font-bold">"No any description"</span>
				)}
			</p>
			<ul className="flex justify-between flex-wrap gap-4">
				<li>
					<b>Narx</b>: {stadium.price} so'm
				</li>
				<li>
					<b>Boshlang'ich tolov</b>: {stadium.initialPay} so'm
				</li>
				<li>
					<b>Uzunligi</b>: {stadium.length} m
				</li>
				<li>
					<b>Kengligi</b>: {stadium.width} m
				</li>
				<li>
					<b>Ochilish vaqti</b>: {stadium.startHour}
				</li>
				<li>
					<b>Yopilish vaqti</b>: {stadium.endHour}
				</li>
				<li className="flex stadiums-center gap-2 ">
					<b>Dush :</b>
					{stadium.shower ? (
						<FaCheck
							fontSize={25}
							color="green"
							fontWeight={"bold"}
						/>
					) : (
						<MdDoNotDisturb
							fontSize={25}
							color="red"
							fontWeight={"bold"}
						/>
					)}
				</li>
				<li className="flex stadiums-center gap-2 ">
					<b>Shopping: </b>
					{stadium.shopping ? (
						<FaCheck
							fontSize={25}
							color="green"
							fontWeight={"bold"}
						/>
					) : (
						<MdDoNotDisturb
							fontSize={25}
							color="red"
							fontWeight={"bold"}
						/>
					)}
				</li>
				<li className="flex stadiums-center gap-2 ">
					<b>WC:</b>
					{stadium.toilet ? (
						<FaCheck
							fontSize={25}
							color="green"
							fontWeight={"bold"}
						/>
					) : (
						<MdDoNotDisturb
							fontSize={25}
							color="red"
							fontWeight={"bold"}
						/>
					)}
				</li>
			</ul>
		</div>
	);
};

export default StadiumCard;
