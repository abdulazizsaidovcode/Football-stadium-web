import { useState } from "react";
import { KeysType, MasterType } from "../../constants/types";
import { AlertModal } from "../custom/alert-modal";
import { useDelete } from "../../hooks/useDelete";
import MasterInfoModal from "./master-info-modal";

const Table = ({
	data,
	keys,
	type,
	className,
	onAction,
	itemsPerPage = 6,
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
		deleteUser(id);
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
									{(item[key.key as keyof MasterType] as
										| string
										| number
										| null) ?? "N/A"}
								</td>
							))}

							<td className="py-4 px-6 flex w-[80%] justify-between">
								{type === "approved" ? (
									<>
										<AlertModal
											text="Delete"
											basicFunction={() => handleDelete(item.id)}
											question="Are you sure you want to delete this item?"
										/>
										{delete_key === "user/masters/list" &&
										type === "approved" ? (
											<MasterInfoModal id={item.id} />
										) : null}
									</>
								) : (
									<div className="w-[60%] flex justify-between">
										<AlertModal
											text="Confirm"
											basicFunction={() =>
												onAction && onAction(item.id, "MASTER_CONFIRMED")
											}
											question="Do you confirm this master ?"
										/>
										<AlertModal
											text="Reject"
											basicFunction={() =>
												onAction && onAction(item.id, "MASTER_REJECTED")
											}
											question="Are you sure reject this master ?"
										/>
									</div>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="flex justify-between items-center py-4">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					className={`px-4 py-2 bg-gray-800 text-white rounded ${
						currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
					}`}
					disabled={currentPage === 1}
					aria-label="Previous page">
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
					disabled={currentPage === totalPages}
					aria-label="Next page">
					Next
				</button>
			</div>
		</div>
	);
};

export default Table;
