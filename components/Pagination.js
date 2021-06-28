import React from 'react';
import usePagination from '../hooks/usePagination';
import PaginationItem from './PaginationItem';

function renderItem(props) {
	return <PaginationItem {...props} />;
}

const Pagination = (props) => {
	const defaultProps = {
		boundaryCount: 1,
		count: 1,
		disabled: false,
		hideNextButton: false,
		hidePrevButton: false,
		renderItem: (item) => <PaginationItem {...item} />,
		showFirstButton: false,
		showLastButton: false,
		siblingCount: 1,
		showEllipsis: true,
		...props
	};

	const { items } = usePagination({ ...defaultProps });

	return (
		<ul style={{ display: 'flex', listStyle: 'none' }}>
			{items.map((item, index) => (
				<li key={index}>
					{renderItem({
						...item
					})}
				</li>
			))}
		</ul>
	);
};

export default Pagination;
