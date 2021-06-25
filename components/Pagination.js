import React from 'react';
import usePagination from '../hooks/usePagination';

const Pagination = React.forwardRef(function Pagination(inProps, ref) {
	const defaultProps = {
		boundaryCount: 1,
		count: 10,
		page: 1,
		disabled: false,
		hideNextButton: false,
		hidePrevButton: false,
		showFirstButton: false,
		showLastButton: false,
		siblingCount: 1,
		size: 'medium',
		variant: 'text'
	};

	const { items } = usePagination({ ...defaultProps });

	return (
		<div style={{ display: 'flex' }}>
			{items.map((item, index) => (
				<li key={index}>{item.page}</li>
			))}
		</div>
	);
});

export default Pagination;
