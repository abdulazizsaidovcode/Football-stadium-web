import Table from "../../components/custom/table";
import Pagination from "../../components/custom/pagination";
import { MasterKeys } from "../../constants";
import { usePagination } from "../../hooks/usePaginatedData";
import { useStatus } from "../../hooks/useMastersApproved";
import { useGetData } from "../../hooks/useGetData";

const NotMasters = () => {
	const { page, nextPage, prevPage } = usePagination("notMasterPage");
	const { data: notConrmedData, isLoading: notConfirmedLoading } = useGetData(
		"user/not/confirmed/master/list",
		page,
	);
	const { mutate: ApproveOrRejectFunction } = useStatus();

	const handleAction = (id: string, status: string) => {
		ApproveOrRejectFunction({ id, value: status });
	};

	return (
		<>
			<Table
				onAction={handleAction}
				data={notConrmedData?.data?.object || []}
				keys={MasterKeys}
				type="not_approved"
				isLoading={notConfirmedLoading}
			/>
			<Pagination
				prevPage={prevPage}
				nextPage={nextPage}
			/>
		</>
	);
};

export default NotMasters;
