import Table from "../../components/custom/table";
import { MasterKeys } from "../../data/data";
import { useGetData } from "../../hooks/useGetData";
import { useStatus } from "../../hooks/useMastersApproved";

const NotMasters = () => {
	const { data: confirmedMasters, isLoading: confirmedLoading } = useGetData(
		"user/not/confirmed/master/list",
	);
	const { mutate: ApproveOrRejectFunction } = useStatus();

	const handleAction = (id: string, status: string) => {
		try {
			ApproveOrRejectFunction({ id, value: status });
			alert(
				`Master ${
					status === "MASTER_CONFIRMED" ? "approved" : "rejected"
				} successfully!`,
			);
		} catch (error) {
			alert(error);
		}
	};
	return (
		<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-xl font-bold text-white bg-gradient-to-r from-black via-gray-800 to-gray-900">
			{confirmedLoading ? (
				"Loading"
			) : confirmedMasters ? (
				<Table
					onAction={handleAction}
					className={"bg-transparent"}
					data={confirmedMasters}
					keys={MasterKeys}
					type="not_approved"
				/>
			) : (
				"No data available"
			)}
		</div>
	);
};

export default NotMasters;
