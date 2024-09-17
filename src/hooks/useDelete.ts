import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../server";
import { MasterType } from "../data/types";
import { toast } from "react-toastify";

const deleteFunction = async (id: string) => {
	await instance.delete(`user/${id}`);
};

const useDeleteFunction = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteFunction(id),
		onMutate: async (id: string) => {
			console.log("onmutate");

			await queryClient.cancelQueries({ queryKey: ["user/masters/list"] });
			const previousMasters = queryClient.getQueryData<MasterType[]>([
				"user/masters/list",
			]);
			queryClient.setQueryData<MasterType[]>(["user/masters/list"], (old) =>
				old?.filter((master) => master.id !== id),
			);
			return { previousMasters };
		},
		onError: (error, id, context) => {
			queryClient.setQueryData(["user/masters/list"], context?.previousMasters);
			console.error("Delete failed:", error);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["user/masters/list"] });
			toast.error("Delete Successfully")
		},
	});
};

export const useDelete = () => useDeleteFunction();
