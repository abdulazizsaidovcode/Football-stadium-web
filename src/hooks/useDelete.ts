import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../server/config";
import { MasterType } from "../constants/types";

const deleteFunction = async (id: string) => {
	await instance.delete(`user/${id}`);
};

const useDeleteFunction = (key: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteFunction(id),
		onMutate: async (id: string) => {
			await queryClient.cancelQueries({ queryKey: [key] });
			const previousMasters = queryClient.getQueryData<MasterType[]>([key]);
			queryClient.setQueryData<MasterType[]>([key], (old) =>
				old?.filter((master) => master.id !== id),
			);
			return { previousMasters };
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [key] });
		},
	});
};

export const useDelete = (key: string) => useDeleteFunction(key);
