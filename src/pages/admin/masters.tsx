import Table from "../../components/custom/table";
import { useGetData } from "../../hooks/useGetData";

const Masters = () => {
	const keys = [
		{ key: "firstName", title: "First Name" },
		// { key: "id", title: "id" },
		{ key: "lastName", title: "Last Name" },
		{ key: "password", title: "Password" },
		{ key: "phoneNumber", title: "Phone Number" },
	];
	const { data, isLoading } = useGetData("user/masters/list");
	return (
		<>
			{isLoading ? (
				"Loading"
			) : (
				<Table
					data={data.data.object}
					keys={keys}
				/>
			)}
		</>
	);
};

export default Masters;
