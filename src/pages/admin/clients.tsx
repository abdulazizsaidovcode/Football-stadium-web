import Table from "../../components/custom/table";
import Pagination from "../../components/custom/pagination";
import { ClientKeys } from "../../constants";
import { usePagination } from "../../hooks/usePaginatedData";
import { useGetData } from "../../hooks/useGetData";

const Clients = () => {
	const { page, nextPage, prevPage } = usePagination("clientPage");
	const { data: ClientData, isLoading } = useGetData(
		"user/clients/for-admin/list",
		page,
	);

	return (
		<div className="w-full relative h-[90%] rounded-md p-10 md:text-sm text-black bg-gray-100">
			<Table
				data={ClientData?.data?.object || []}
				keys={ClientKeys}
				type="approved"
				isLoading={isLoading}
				delete_key="user/clients/for-admin/list"
			/>
			<Pagination
				prevPage={prevPage}
				nextPage={nextPage}
			/>
		</div>
	);
};

export default Clients;
