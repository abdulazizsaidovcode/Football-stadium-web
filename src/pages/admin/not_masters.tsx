import Table from "@/components/custom/table";
import Pagination from "@/components/custom/pagination";
import { MasterKeys } from "@/constants";
import { usePagination } from "@/hooks/usePaginatedData";
import { useStatus } from "@/hooks/useMastersApproved";
import { useGetData } from "@/hooks/useGetData";

const NotMasters = () => {
	const { page, nextPage, prevPage } = usePagination("notMasterPage");
	const { data: notConfirmedMasters, isLoading: notConfirmedLoading } =
		useGetData("user/not/confirmed/master/list", page);
	const { mutate: ApproveOrRejectFunction } = useStatus();

	const handleAction = (id: string, status: string) => {
		ApproveOrRejectFunction({ id, value: status });
	};

	const { data, isLoading } = useGetData("statistic/for/admin/count-all");
	console.log(isLoading ? "loading" : data.data);

	return (
		<>
			<Table
				onAction={handleAction}
				data={notConfirmedMasters?.data?.object || []}
				keys={MasterKeys}
				type="not_approved"
				isLoading={notConfirmedLoading}
			/>
			<Pagination
				count={notConfirmedMasters?.data?.object?.length}
				prevPage={prevPage}
				nextPage={nextPage}
				page={page}
				countAll={data?.data?.masterNew}
			/>
		</>
	);
};

export default NotMasters;
