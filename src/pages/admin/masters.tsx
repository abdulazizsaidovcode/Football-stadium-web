import { Tabs } from "@/components/ui/tabs";
import { ConfirmedMasters } from "@/pages/admin/confirmed_masters";
import NotMasters from "@/pages/admin/not_masters";

const Masters = () => {
	const tabs = [
		{
			title: "Confirmed Masters",
			value: "product",
			content: (
				<div className="w-full relative h-[90%] rounded-md p-10 md:text-sm text-black bg-gray-100">
					<ConfirmedMasters />
				</div>
			),
		},
		{
			title: "Not Confirmed Masters",
			value: "services",
			content: (
				<div className="w-full relative h-[80%] rounded-md p-10 md:text-sm text-black bg-gray-100">
					<NotMasters />
				</div>
			),
		},
	];
	return (
		<div className="h-[20rem] md:h-[35rem] [perspective:1000px] relative b flex flex-col mx-auto w-full  items-start justify-start">
			<Tabs tabs={tabs} />
		</div>
	);
};

export default Masters;
