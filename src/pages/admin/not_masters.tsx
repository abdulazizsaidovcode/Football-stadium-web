import Table from "../../components/custom/table";
import Pagination from "../../components/custom/pagination";
import { MasterKeys } from "../../constants";
import { usePaginatedData, usePagination } from "../../hooks/usePaginatedData";
import { useStatus } from "../../hooks/useMastersApproved";

const NotMasters = () => {
	const { page, nextPage, prevPage } = usePagination("notMasterPage");
	const { data: notConrmedData, isLoading: notConfirmedLoading } =
		usePaginatedData("user/not/confirmed/master/list", page);
	const { mutate: ApproveOrRejectFunction } = useStatus();

	const handleAction = (id: string, status: string) => {
		ApproveOrRejectFunction({ id, value: status });
	};

	return (
		<>
			<Table
				onAction={handleAction}
				data={notConrmedData || []}
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
