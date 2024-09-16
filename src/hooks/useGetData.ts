import { useQuery } from "@tanstack/react-query";
import instance from "../server";
const fetchData = async ({ key }: { key: string }) => {
	const response = await instance.get(key);
	return response.data;
};

const useData = (key: string) => {
	return useQuery({
		queryKey: [key],
		queryFn: () => fetchData({ key }),
		retry: 1,
	});
};

export const useGetData = (key: string) => useData(key);
