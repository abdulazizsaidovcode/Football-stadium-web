import { useQuery } from "@tanstack/react-query";
import instance from "../server/config";
export const useYearlyStatisticData = (year: number, key: string) => {
	return useQuery({
		queryKey: [`statistic/for/admin/${key}`, year],
		queryFn: async () => {
			const response = await instance.get(
				`statistic/for/admin/${key}?year=${year}`,
			);
			return response.data;
		},
	});
};
