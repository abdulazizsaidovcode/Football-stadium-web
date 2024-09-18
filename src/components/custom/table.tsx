import { KeysType, MasterType } from "../../data/types";
import { useDelete } from "../../hooks/useDelete";

const Table = ({
	data,
	keys,
	type,
	className,
	onAction,
}: {
	data: MasterType[];
	keys: KeysType[];
	type: string;
	className: string;
	onAction?: (id: string, status: string) => void;
}) => {
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
		<div className={`overflow-x-auto ${className} no-visible-scrollbar`}>
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
				<tbody className="no-visible-scrollbar"> 
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
