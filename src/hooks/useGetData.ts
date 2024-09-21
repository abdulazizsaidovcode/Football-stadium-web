import { useQuery } from "@tanstack/react-query";
import instance from "../server/config";
import { MasterType } from "../constants/types";
interface DataResponse {
	data: {
		object: MasterType[];
	};
}

const fetchData = async ({
	key,
	page,
}: {
	key: string;
	page: number;
}): Promise<MasterType[]> => {
	const response = await instance.get<DataResponse>(
		`${key}?page=${page}&size=5`,
	);
	return response.data.data.object;
};

const useData = (key: string, page: number) => {
	return useQuery({
		queryKey: [key, page],
		queryFn: () => fetchData({ key, page }),
	});
};

export const useGetData = (key: string, page: number) => useData(key, page);
