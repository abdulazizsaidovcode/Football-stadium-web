import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "@/server/config";
import { MasterType } from "@/constants/types";
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

	return useMutation({
		mutationFn: ({ value, id }: ApproveOrRejectType) =>
			ApproveOrReject({ value, id }),
		onMutate: async ({ id }) => {
			console.log("onmutate");

			await queryClient.cancelQueries({
				queryKey: ["user/not/confirmed/master/list"],
			});
			const previous_not_masters = queryClient.getQueryData<MasterType[]>([
				"user/not/confirmed/master/list",
			]);
			queryClient.setQueryData<MasterType[]>(
				["user/not/confirmed/master/list"],
				(old) => old?.filter((not_master) => not_master.id !== id),
			);
			return { previous_not_masters };
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["user/masters/list"],
			});
			queryClient.invalidateQueries({
				queryKey: ["user/not/confirmed/master/list"],
			});
			toast.success("Success");
		},
	});
};

export const useStatus = useApproveOrReject;
