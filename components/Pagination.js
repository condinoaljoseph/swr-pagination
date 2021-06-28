import React from 'react';
import usePagination from '../hooks/usePagination';
import PaginationItem from './PaginationItem';

const Pagination = React.forwardRef(function Pagination(inProps, ref) {
	const props = { ...inProps };

	const {
		boundaryCount = 1,
		count = 1,
		disabled = false,
		hideNextButton = false,
		hidePrevButton = false,
		renderItem = (item) => <PaginationItem {...item} />,
		showFirstButton = false,
		showLastButton = false,
		siblingCount = 1,
		showEllipsis = true,
		...other
	} = props;

	const { items } = usePagination({ ...props });

	return (
		<ul style={{ display: 'flex', listStyle: 'none' }}>
			{items.map((item, index) => {
				return (
					<li key={index}>
						{renderItem({
							...item,
							other
						})}
					</li>
				);
			})}
		</ul>
	);
});

export default Pagination;
