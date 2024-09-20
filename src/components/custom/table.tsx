import { useState } from "react";
import { KeysType, MasterType } from "../../constants/types";
import { AlertModal } from "../custom/alert-modal";
import { useDelete } from "../../hooks/useDelete";
import MasterInfoModal from "./master-info-modal";

const Table = ({
	data,
	keys,
	type,
	onAction,
	itemsPerPage = 5,
	delete_key,
}: {
	data: MasterType[];
	keys: KeysType[];
	type: string;
	onAction?: (id: string, status: string) => void;
	itemsPerPage?: number;
	delete_key?: string;
}) => {
	const { mutate: deleteUser } = useDelete(delete_key || "");
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(data.length / itemsPerPage);

	const getPaginatedData = () => {
		const start = (currentPage - 1) * itemsPerPage;
		const end = currentPage * itemsPerPage;
		return data.slice(start, end);
	};

	const handleDelete = (id: string) => {
		deleteUser(id);
	};

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	return (
		<>
			<table className="min-w-full">
				<thead>
					<tr>
						{keys.map((key) => (
							<th
								key={key.key}
								className="text-left p-4 font-medium border border-[#111827]">
								{key.title}
							</th>
						))}
						{/* {type === "approved" && (
							<th className="text-left p-4 font-medium border border-[#111827]">
								Master Status
							</th>
						)} */}
						<th className="text-left p-4 font-medium border border-[#111827]">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="no-visible-scrollbar">
					{getPaginatedData().map((item) => (
						<tr
							key={item.id}
							className="border border-[#111827]">
							{keys.map((key) => (
								<td
									key={key.key}
									className="p-4 border border-[#111827]">
									{(item[key.key as keyof MasterType] as
										| string
										| number
										| null) ?? "N/A"}
								</td>
							))}
							{/* {type === "approved" && (
								<td className="py-4 px-6 border border-[#111827]">
									{item.userStatus && "Qabul qilingan"}
								</td>
							)} */}
							<td className="py-4 px-6 flex gap-2">
								{type === "approved" ? (
									<>
										<AlertModal
											text="Delete"
											basicFunction={() => handleDelete(item.id)}
											question="Are you sure you want to delete this item?"
										/>
										{delete_key === "user/masters/list" && (
											<MasterInfoModal id={item.id} />
										)}
									</>
								) : (
									<div className="flex justify-between gap-4">
										<AlertModal
											text="Confirm"
											basicFunction={() =>
												onAction && onAction(item.id, "MASTER_CONFIRMED")
											}
											question="Do you confirm this master?"
										/>
										<AlertModal
											text="Reject"
											basicFunction={() =>
												onAction && onAction(item.id, "MASTER_REJECTED")
											}
											question="Are you sure to reject this master?"
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

				<span className="text-gray-800">
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
		</>
	);
};

export default Table;
