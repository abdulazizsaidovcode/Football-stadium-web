import { KeysType, MasterType } from "@/constants/types";
import { AlertModal } from "@/components/custom/alert-modal";
import { useDelete } from "@/hooks/useDelete";
import MasterInfoModal from "@/components/custom/master-info-modal";

const Table = ({
	data,
	keys,
	type,
	onAction,
	delete_key,
	isLoading,
}: {
	data: MasterType[];
	keys: KeysType[];
	type: string;
	onAction?: (id: string, status: string) => void;
	delete_key?: string;
	isLoading?: boolean;
}) => {
	const { mutate: deleteUser } = useDelete(delete_key || "");

	const handleDelete = (id: string) => {
		deleteUser(id);
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
						<th className="text-left p-4 font-medium border border-[#111827]">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="no-visible-scrollbar">
					{isLoading ? (
						<tr className="border border-[#111827]">
							<td
								colSpan={keys.length + 1}
								className="text-center p-4">
								Loading...
							</td>
						</tr>
					) : data.length > 0 ? (
						data.map((item) => (
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
						))
					) : (
						<tr className="border border-[#111827]">
							<td
								colSpan={keys.length + 1}
								className="text-center p-4">
								No data available
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	);
};

export default Table;
