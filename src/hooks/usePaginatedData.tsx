import { useEffect, useState } from "react";

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
