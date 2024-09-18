import { useState } from "react";
import { KeysType, MasterType } from "../../data/types";
import { useDelete } from "../../hooks/useDelete";

const Table = ({
	data,
	keys,
	type,
	className,
	onAction,
	itemsPerPage = 8,
	delete_key,
}: {
	data: MasterType[];
	keys: KeysType[];
	type: string;
	className: string;
	onAction?: (id: string, status: string) => void;
	itemsPerPage?: number;
	delete_key?: string;
}) => {
	const { mutate: deleteUser } = useDelete(delete_key || "");
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(data.length / itemsPerPage);
	const paginatedData = data.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	const handleDelete = (id: string) => {
		if (window.confirm("Are you sure you want to delete this user?")) {
			try {
				deleteUser(id);
			} catch (error) {
				console.error("Failed to delete:", error);
			}
		}
	};

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
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
				<tbody className="no-visible-scrollbar">
					{paginatedData.map((item) => (
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

			{/* Pagination controls */}
			<div className="flex justify-between items-center py-4">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					className={`px-4 py-2 bg-gray-800 text-white rounded ${
						currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
					}`}
					disabled={currentPage === 1}>
					Previous
				</button>

				<span className="text-white">
					Page {currentPage} of {totalPages}
				</span>

				<button
					onClick={() => handlePageChange(currentPage + 1)}
					className={`px-4 py-2 bg-gray-800 text-white rounded ${
						currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
					}`}
					disabled={currentPage === totalPages}>
					Next
				</button>
			</div>
		</div>
	);
};

export default Table;
