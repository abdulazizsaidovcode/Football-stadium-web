import Table from "../../components/custom/table";
import { MasterKeys } from "../../data/data";
import { useGetData } from "../../hooks/useGetData";
import { Tabs } from "../../components/ui/tabs";
import { useStatus } from "../../hooks/useMastersApproved";

const Masters = () => {
	const { data: confirmedMasters, isLoading: confirmedLoading } =
		useGetData("user/masters/list");
	const { data: notConfirmedMasters, isLoading: notConfirmedLoading } =
		useGetData("user/not/confirmed/master/list");
	const { mutate: ApproveOrRejectFunction } = useStatus();

	const handleAction = (id: string, status: string) => {
		ApproveOrRejectFunction({ id, value: status });
	};

	const tabs = [
		{
			title: "Approved Masters",
			value: "approved_masters",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-xl font-bold text-white bg-gradient-to-r from-black via-gray-800 to-gray-900">
					<p>Playground tab</p>
					{confirmedLoading ? (
						"Loading"
					) : confirmedMasters ? (
						<Table
							className={"bg-transparent"}
							data={confirmedMasters}
							keys={MasterKeys}
							type="approved"
							onAction={handleAction}
						/>
					) : (
						"No data available"
					)}
				</div>
			),
		},
		{
			title: "Not Approved Masters",
			value: "not_approved_masters",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-xl font-bold text-white bg-gradient-to-r from-black via-gray-800 to-gray-900">
					<p className="mb-4">Content tab</p>
					{notConfirmedLoading ? (
						"Loading"
					) : notConfirmedMasters ? (
						<Table
							className="bg-transparent"
							data={notConfirmedMasters}
							keys={MasterKeys}
							type="not_approved"
							onAction={handleAction}
						/>
					) : (
						"No data available"
					)}
				</div>
			),
		},
	];

	return (
		<div className="h-[20rem] mt-0 md:h-[40rem] [perspective:800px] relative flex flex-col mx-auto w-full items-start justify-start">
			<Tabs tabs={tabs} />
		</div>
	);
};

export default Masters;
