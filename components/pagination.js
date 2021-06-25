const Pagination = ({ page, count }) => {
	return (
		<div style={{ display: 'flex' }}>
			<button
				onClick={() => {
					setPageIndex(pageIndex - 1);
				}}
			>
				prev
			</button>
			<button
				onClick={() => {
					setPageIndex(1);
				}}
			>
				1
			</button>
			{midPages}
			<button
				onClick={() => {
					setPageIndex(TOTAL_PAGES);
				}}
			>
				{TOTAL_PAGES}
			</button>
			<button
				onClick={() => {
					setPageIndex(pageIndex + 1);
				}}
			>
				next
			</button>
		</div>
	);
};

export default Pagination;
