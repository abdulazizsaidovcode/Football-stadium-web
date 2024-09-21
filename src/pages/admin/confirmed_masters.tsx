import Table from "../../components/custom/table";
import Pagination from "../../components/custom/pagination";
import { MasterKeys } from "../../constants";
import { usePaginatedData, usePagination } from "../../hooks/usePaginatedData";

export const ConfirmedMasters = () => {
	const { page, nextPage, prevPage } = usePagination("confirmedPage");
	const { data: confirmedMasters, isLoading: confirmedLoading } =
		usePaginatedData("user/masters/list", page);

	return (
		<>
			<Table
				data={confirmedMasters || []}
				keys={MasterKeys}
				delete_key="user/masters/list"
				type="approved"
				isLoading={confirmedLoading}
			/>
			<Pagination
				prevPage={prevPage}
				nextPage={nextPage}
			/>
		</>
	);
};
