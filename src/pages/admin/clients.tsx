import Table from "../../components/custom/table";
import Pagination from "../../components/custom/pagination";
import { ClientKeys } from "../../constants";
import { usePaginatedData, usePagination } from "../../hooks/usePaginatedData";

const Clients = () => {
	const { page, nextPage, prevPage } = usePagination("clientPage");
	const { data, isLoading } = usePaginatedData(
		"user/clients/for-admin/list",
		page,
	);

	return (
		<div className="w-full relative h-[90%] rounded-md p-10 md:text-sm text-black bg-gray-100">
			<Table
				data={data || []}
				keys={ClientKeys}
				type="approved"
				isLoading={isLoading}
			/>
			<Pagination
				prevPage={prevPage}
				nextPage={nextPage}
			/>
		</div>
	);
};

export default Clients;
