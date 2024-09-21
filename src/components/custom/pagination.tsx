const Pagination = ({
	count,
	prevPage,
	nextPage,
}: {
	count?: number;
	prevPage: () => void;
	nextPage: () => void;
}) => {
	return (
		<div className="flex justify-between items-end py-4">
			<button
				onClick={() => prevPage()}
				className={`px-4 py-2 bg-gray-800 text-white rounded `}
				aria-label="Previous page">
				Previous
			</button>

			<button
				onClick={() => nextPage()}
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
