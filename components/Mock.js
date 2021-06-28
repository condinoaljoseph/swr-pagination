import React from 'react';
import Pagination from './Pagination';
import PaginationItem from './PaginationItem';

const mock = () => {
	return (
		<div>
			<Pagination
				page={21}
				count={30}
				showEllipsis={false}
				renderItem={(item) => <PaginationItem item={item} {...item} />}
			/>
		</div>
	);
};

export default mock;
