import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../server";
import { toast } from "react-toastify";

interface ApproveOrRejectType {
	value: string;
	id: string;
}

const ApproveOrReject = async ({ value, id }: ApproveOrRejectType) => {
	await instance.put(`user/confirmed/master/${id}?USER_STATUS=${value}`, {
		USER_STATUS: value,
	});
};

const useApproveOrReject = () => {
	const queryClient = useQueryClient();
	const MASTER_LIST_KEY = "user/masters/list";
	const NOT_CONFIRMED_MASTER_LIST_KEY = "user/not/confirmed/master/list";

	return useMutation({
		mutationFn: ({ value, id }: ApproveOrRejectType) => ApproveOrReject({ value, id }),
		onSuccess: (_, { value }) => {
			queryClient.invalidateQueries({ queryKey: [MASTER_LIST_KEY] });
			queryClient.invalidateQueries({ queryKey: [NOT_CONFIRMED_MASTER_LIST_KEY] });
			toast(
				value === "MASTER_CONFIRMED" ? "Master approved successfully!" : "Master rejected."
			);
		},
		onError: (error) => {
			console.error("Approval or Rejection failed:", error);
			toast.error("Failed to update the master status.");
		},
	});
};

export const useStatus = useApproveOrReject;
