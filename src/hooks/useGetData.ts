import { useQuery } from "@tanstack/react-query";
import instance from "@/server/config";

const getData = async (endpoint: string, page?: number) => {
	const response = await instance.get(
		page !== undefined ? `${endpoint}?page=${page}&size=5` : endpoint,
	);
	return response.data;
};

export const useGetData = (endpoint: string, page?: number) => {
	return useQuery({
		queryKey: [endpoint, page],
		queryFn: () => getData(endpoint, page),
	});
};
