import { useEffect } from "react";
import { KeysType, MasterType } from "../../data/types";
import { useDelete } from "../../hooks/useDelete";

const Table = ({
	data,
	keys,
	type,
	className,
	onAction,
	reFetch,
}: {
	data: MasterType[];
	keys: KeysType[];
	type: string;
	className: string;
	onAction?: (id: string, status: string) => void;
	reFetch: () => void;  
}) => {
	const { mutate: deleteUser, isSuccess } = useDelete();

	useEffect(() => {
		if (isSuccess) {
			reFetch(); // Call refetch only after a successful delete
		}
	}, [isSuccess, reFetch]); // Include reFetch in the dependency array

	const handleDelete = (id: string) => {
		try {
			deleteUser(id);
		} catch (error) {
			console.error("Failed to delete:", error);
		}
	};

	return (
		<div className={`overflow-x-auto ${className}`}>
			<table className="min-w-full bg-transparent border rounded-lg">
				<thead className="bg-transparent border-b">
					<tr>
						{keys.map((key) => (
							<th
								key={key.key}
								className="text-left py-3 px-6 font-medium text-white">
								{key.title}
							</th>
						))}
						<th className="text-left py-3 px-6 font-medium text-white">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => (
						<tr
							key={item.id}
							className="border-b">
							{keys.map((key) => (
								<td
									key={key.key}
									className="py-4 px-6 text-white">
									{item[key.key as keyof MasterType] ?? "N/A"}
								</td>
							))}
							<td className="py-4 px-6">
								{type === "approved" ? (
									<span
										onClick={() => handleDelete(item.id)}
										className="text-red-600 cursor-pointer">
										Delete
									</span>
								) : (
									<>
										<span
											onClick={() =>
												onAction && onAction(item.id, "MASTER_CONFIRMED")
											}
											className="text-blue-600 cursor-pointer mr-4">
											Confirm
										</span>
										<span
											onClick={() =>
												onAction && onAction(item.id, "MASTER_REJECTED")
											}
											className="text-red-600 cursor-pointer">
											Reject
										</span>
									</>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
