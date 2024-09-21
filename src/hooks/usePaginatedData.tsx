import { useEffect, useState } from "react";
import { useGetData } from "./useGetData";

export const usePagination = (storageKey: string) => {
	const [page, setPage] = useState(() => {
		const savedPage = localStorage.getItem(storageKey);
		return savedPage ? parseInt(savedPage, 10) : 0;
	});

	useEffect(() => {
		localStorage.setItem(storageKey, page.toString());
	}, [page, storageKey]);

	const nextPage = () => setPage((prev) => prev + 1);

	const prevPage = () => setPage((prev) => Math.max(prev - 1, 0));

	return { page, nextPage, prevPage };
};

export const usePaginatedData = (url: string, page: number) => {
	const { data, isLoading } = useGetData(url, page);
	return { data, isLoading };
};
