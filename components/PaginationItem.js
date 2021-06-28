import React, { Children } from 'react';

const PaginationItem = React.forwardRef(function PaginationItem(inProps, ref) {
	const props = { ...inProps };
	const {
		type = 'page',
		className,
		disabled = false,
		selected = false,
		component,
		item,
		...other
	} = props;

	return item.type === 'start-ellipsis' || item.type === 'end-ellipsis' ? (
		<button>...</button>
	) : item.type === 'previous' ? (
		<button>prev</button>
	) : item.type === 'next' ? (
		<button>next</button>
	) : (
		<button
			style={{ color: item.selected ? 'red' : 'black' }}
			onClick={item.onClick}
		>
			{React.createElement(
				component,
				{ ...item },
				item.type === 'page' && item.page
			)}
		</button>
	);
});

export default PaginationItem;
