import React from 'react';

const PaginationItem = (props) => {
	const { type, className, disabled, page, selected } = props;
	console.log(type);

	return type === 'start-ellipsis' || type === 'end-ellipsis' ? (
		<button>...</button>
	) : type === 'previous' ? (
		<button>prev</button>
	) : type === 'next' ? (
		<button>next</button>
	) : (
		<button style={{ color: selected ? 'red' : 'black' }}>
			{type === 'page' && page}
		</button>
	);
};

export default PaginationItem;
