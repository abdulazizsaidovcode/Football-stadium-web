const Pagination = ({
	prevPage,
	nextPage,
}: {
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
				className={`px-4 py-2 bg-gray-800 text-white rounded `}
				aria-label="Next page">
				Next
			</button>
		</div>
	);
};

export default Pagination;
