import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../server";

const deleteFunction = async (id: string) => {
	await instance.delete(`user/${id}`);
};

const useDeleteFunction = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteFunction(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user/masters/list"] });
		},
		onError: (error) => {
			console.error("Delete failed:", error);
			// Optionally display a toast or UI notification for the user
		},
	});
};

export const useDelete = () => useDeleteFunction();
