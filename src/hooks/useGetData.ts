import { useQuery } from "@tanstack/react-query";
import instance from "../server";
import { MasterType } from "../data/types";
interface DataResponse {
	data: {
		object: MasterType[];
	};
}

const fetchData = async ({ key }: { key: string }): Promise<MasterType[]> => {
	const response = await instance.get<DataResponse>(key);
	return response.data.data.object;
};

const useData = (key: string) => {
	return useQuery({
		queryKey: [key],
		queryFn: () => fetchData({ key }),
	});
};

export const useGetData = (key: string) => useData(key);
