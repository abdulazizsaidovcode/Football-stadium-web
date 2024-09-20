import Table from "../../components/custom/table";
import { ClientKeys } from "../../constants";
import { useGetData } from "../../hooks/useGetData";

const Clients = () => {
	const { data, isLoading } = useGetData("user/clients/for-admin/list");
	console.log("🚀 ~ Clients ~ data:", isLoading ? "Loading" : data);

	return (
		<div className="w-full relative h-[90%] rounded-md p-10 md:text-sm text-black bg-gray-100">
			{isLoading ? (
				"Loading"
			) : data ? (
				<Table
					data={data}
					keys={ClientKeys}
					type="approved"
					delete_key="user/clients/for-admin/list"
				/>
			) : (
				"No data available"
			)}
		</div>
	);
};

export default Clients;
