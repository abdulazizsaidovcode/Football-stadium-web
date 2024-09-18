import { Tabs } from "../../components/ui/tabs"
import { ConfirmedMasters } from "./confirmed_masters";
import NotMasters from "./not_masters";

const Masters = () => {
	const tabs = [
		{
			title: "Confirmed Masters",
			value: "product",
			content: (
				<div className="w-full relative h-full rounded-2xl p-10 text-xl md:text-sm font-bold text-white bg-gradient-to-r from-black via-gray-800 to-gray-900">
					<ConfirmedMasters />
				</div>
			),
		},
		{
			title: "Not Confirmed Masters",
			value: "services",
			content: (
				<div className="w-full relative h-full rounded-2xl p-10 text-xl md:text-sm font-bold text-white bg-gradient-to-r from-black via-gray-800 to-gray-900">
					<NotMasters />
				</div>
			),
		},
	];
	return (
		<div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col mx-auto w-full  items-start justify-start">
			<Tabs tabs={tabs} />
		</div>
	);
};

export default Masters;
