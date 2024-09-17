import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../server";
interface ApproveOrRejectType {
	value: string;
	id: string;
}
const fetchData = async () => {
	const response = await instance.get("/user/masters/list");
	return response.data;
};

const fetchNotData = async () => {
	const response = await instance.get("user/not/confirmed/master/list");
	console.log("🚀 ~ fetchNotData ~ response:", response.data);
	return response.data;
};

const useNotData = () => {
	return useQuery({
		queryKey: ["not_masters"],
		queryFn: () => fetchNotData(),
		retry: 1,
	});
};

const useData = () => {
	return useQuery({
		queryKey: ["masters"],
		queryFn: () => fetchData(),
		retry: 1,
	});
};

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
			queryClient.invalidateQueries({
				queryKey: ["not_masters"],
			});
			queryClient.invalidateQueries({ queryKey: ["masters"] });
		},
	});
};

export const useStatus = useApproveOrReject;

const deleteMasters = async (id: string) => {
	await instance.delete(`user/${id}`);
};

const useDeleteMasters = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteMasters(id),
		onSuccess: () => {
			console.log("masters invalidating");
			queryClient.invalidateQueries({ queryKey: ["masters"] });
			console.log("Delete");
		},
		onError: (error: Error) => {
			console.error(error.message);
		},
	});
};

export const useDelete = () => useDeleteMasters();
export const useNotConfirmedMasters = () => useNotData();
export const useConfirmedMasters = () => useData();
