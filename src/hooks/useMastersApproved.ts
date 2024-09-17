import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../server";

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
	return useMutation({
		mutationFn: ({ value, id }: ApproveOrRejectType) =>
			ApproveOrReject({ value, id }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user/masters/list"] });
			queryClient.invalidateQueries({
				queryKey: ["user/not/confirmed/master/list"],
			});
		},
	});
};

export const useStatus = useApproveOrReject;
