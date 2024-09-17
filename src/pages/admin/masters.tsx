import Table from "../../components/custom/table";
import { MasterKeys } from "../../data/data";
import { useGetData } from "../../hooks/useGetData";
import { useDelete } from "../../hooks/useDelete";

const Masters = () => {
	const { data: confirmedMasters, isLoading: confirmedLoading } =
		useGetData("user/masters/list");
	const { mutate: deleteUser } = useDelete();
	const handleDelete = (id: string) => {
		if (window.confirm("Are you sure you want to delete this user?")) {
			try {
				deleteUser(id);
			} catch (error) {
				console.error("Failed to delete:", error);
			}
		}
	};
	return (
		<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-xl font-bold text-white bg-gradient-to-r from-black via-gray-800 to-gray-900">
			{confirmedLoading ? (
				"Loading"
			) : confirmedMasters ? (
				<Table
					deleteFunction={handleDelete}
					className={"bg-transparent"}
					data={confirmedMasters}
					keys={MasterKeys}
					type="approved"
				/>
			) : (
				"No data available"
			)}
		</div>
	);
};

export default Masters;
