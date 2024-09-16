import { useGetData } from "../../hooks/useGetData";

const Clients = () => {
	const { data, isLoading } = useGetData("user/clients/for-admin/list");
	console.log("🚀 ~ Clients ~ data:", isLoading ? "Loading" : data);

	return (
		<div>
			{isLoading ? (
				"Loading..."
			) : (
				<ul>
					<li>loaded</li>
				</ul>
			)}
		</div>
	);
};

export default Clients;
