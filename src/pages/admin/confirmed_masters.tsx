import Table from "../../components/custom/table";
import Pagination from "../../components/custom/pagination";
import { MasterKeys } from "../../constants";
import { usePagination } from "../../hooks/usePaginatedData";
import { useGetData } from "../../hooks/useGetData";

export const ConfirmedMasters = () => {
	const { page, nextPage, prevPage } = usePagination("confirmedPage");
	const { data: confirmedMasters, isLoading: confirmedLoading } = useGetData(
		"user/masters/list",
		page,
	);

	console.log(confirmedLoading ? "loading" : confirmedMasters.data.object);

	return (
		<>
			<Table
				data={confirmedMasters?.data?.object || []}
				isLoading={confirmedLoading}
				keys={MasterKeys}
				delete_key="user/masters/list"
				type="approved"
			/>
			<Pagination
				prevPage={prevPage}
				nextPage={nextPage}
			/>
		</>
	);
};
