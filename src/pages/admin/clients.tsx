import Table from "../../components/custom/table";
import { ClientKeys } from "../../constants";
import { useGetData } from "../../hooks/useGetData";

const Clients = () => {
	const { data, isLoading } = useGetData("user/clients/for-admin/list");
	console.log("🚀 ~ Clients ~ data:", isLoading ? "Loading" : data);

	return (
		<div className="w-full relative rounded-2xl p-10 text-xl md:text-sm font-bold text-white bg-gradient-to-r from-black via-gray-800 to-gray-900">
			{isLoading ? (
				"Loading"
			) : data ? (
				<Table
					className={"bg-transparent"}
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
