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

	console.log(component, 'hehe');

	// return component;
	// return <div>{React.createElement(component)}</div>;

	return item.type === 'start-ellipsis' || item.type === 'end-ellipsis' ? (
		<button>...</button>
	) : item.type === 'previous' ? (
		<button>prev</button>
	) : item.type === 'next' ? (
		<button>next</button>
	) : (
		<button style={{ color: selected ? 'red' : 'black' }}>
			{React.createElement(
				component,
				{ ...item },
				item.type === 'page' && item.page
			)}
		</button>
	);
});

export default PaginationItem;
