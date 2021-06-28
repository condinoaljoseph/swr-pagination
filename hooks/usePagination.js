import useControlled from './useControlled';

export default function usePagination(props = {}) {
	const {
		boundaryCount = 1,
		componentName = 'usePagination',
		count = 1,
		disabled = false,
		defaultPage = 1,
		hideNextButton = false,
		hidePrevButton = false,
		showFirstButton = false,
		showLastButton = false,
		showEllipsis = true,
		siblingCount = 1,
		page: pageProp,
		onChange: handleChange
	} = props;

	const [page, setPageState] = useControlled({
		controlled: pageProp,
		default: defaultPage,
		name: componentName,
		state: 'page'
	});

	const handleClick = (event, value) => {
		if (!pageProp) {
			setPageState(value);
		}
		if (handleChange) {
			handleChange(event, value);
		}
	};

	// https://dev.to/namirsab/comment/2050
	const range = (start, end) => {
		const length = end - start + 1;
		return Array.from({ length }, (_, i) => start + i);
	};

	const startPages = range(1, Math.min(boundaryCount, count));
	const endPages = range(
		Math.max(count - boundaryCount + 1, boundaryCount + 1),
		count
	);

	const siblingsStart = Math.max(
		Math.min(
			// Natural start
			page - siblingCount,
			// Lower boundary when page is high
			count - boundaryCount - siblingCount * 2 - 1
		),
		// Greater than startPages
		boundaryCount + 2
	);

	const siblingsEnd = Math.min(
		Math.max(
			// Natural end
			page + siblingCount,
			// Upper boundary when page is low
			boundaryCount + siblingCount * 2 + 2
		),
		// Less than endPages
		endPages.length > 0 ? endPages[0] - 2 : count - 1
	);

	// Basic list of items to render
	// e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
	const itemList = [
		...(showFirstButton ? ['first'] : []),
		...(hidePrevButton ? [] : ['previous']),
		...startPages,

		// Start ellipsis
		// eslint-disable-next-line no-nested-ternary
		...(siblingsStart > boundaryCount + 2
			? showEllipsis
				? ['start-ellipsis']
				: []
			: boundaryCount + 1 < count - boundaryCount
			? [boundaryCount + 1]
			: []),

		// Sibling pages
		...range(siblingsStart, siblingsEnd),

		// End ellipsis
		// eslint-disable-next-line no-nested-ternary
		...(siblingsEnd < count - boundaryCount - 1
			? showEllipsis
				? ['end-ellipsis']
				: []
			: count - boundaryCount > boundaryCount
			? [count - boundaryCount]
			: []),

		...endPages,
		...(hideNextButton ? [] : ['next']),
		...(showLastButton ? ['last'] : [])
	];

	// Map the button type to its page number
	const buttonPage = (type) => {
		switch (type) {
			case 'first':
				return 1;
			case 'previous':
				return page - 1;
			case 'next':
				return page + 1;
			case 'last':
				return count;
			default:
				return null;
		}
	};

	// Convert the basic item list to PaginationItem props objects
	const items = itemList.map((item) => {
		return typeof item === 'number'
			? {
					'onClick': (event) => {
						handleClick(event, item);
					},
					'type': 'page',
					'page': item,
					'selected': item === page,
					disabled,
					'aria-current': item === page ? 'true' : undefined
			  }
			: {
					onClick: (event) => {
						handleClick(event, buttonPage(item));
					},
					type: item,
					page: buttonPage(item),
					selected: false,
					disabled:
						disabled ||
						(item.indexOf('ellipsis') === -1 &&
							(item === 'next' || item === 'last' ? page >= count : page <= 1))
			  };
	});

	return {
		items
	};
}
