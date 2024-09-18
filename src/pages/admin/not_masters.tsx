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
		<>
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
		</>
	);
};

export default NotMasters;
