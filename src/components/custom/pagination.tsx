const Pagination = ({
	count,
	prevPage,
	countAll,
	page,
	nextPage,
}: {
	countAll?: number;
	count?: number;
	page?: number;
	prevPage: () => void;
	nextPage: () => void;
}) => {
	const totalPages = countAll ? Math.ceil(countAll / 5) : 0;
	return (
		<div className="flex justify-between items-end py-4">
			<button
				onClick={prevPage}
				className={`px-4 py-2 bg-gray-800 text-white rounded ${
					page === 0 ? "cursor-not-allowed" : "cursor-pointer"
				}`}
				aria-label="Previous page"
				disabled={page === 0}>
				Previous
			</button>
			<div>
				{page === 0 ? page + 1 : page && page + 1}/{totalPages}
			</div>
			<button
				onClick={nextPage}
				disabled={count ? count < 5 : false}
				className={`px-4 py-2 bg-gray-800 text-white rounded ${
					count && count < 5 ? "cursor-not-allowed" : "cursor-pointer"
				}`}
				aria-label="Next page">
				Next
			</button>
		</div>
	);
};

export default Pagination;
