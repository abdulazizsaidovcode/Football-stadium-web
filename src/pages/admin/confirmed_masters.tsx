import Table from "../../components/custom/table";
import { MasterKeys } from "../../constants";
import { useGetData } from "../../hooks/useGetData";

export const ConfirmedMasters = () => {
	const { data: confirmedMasters, isLoading: confirmedLoading } =
		useGetData("user/masters/list");

	return (
		<>
			{confirmedLoading ? (
				"Loading"
			) : confirmedMasters ? (
				<Table
					data={confirmedMasters}
					keys={MasterKeys}
					type="approved"
					delete_key="user/masters/list"
				/>
			) : (
				"No data available"
			)}
		</>
	);
};
