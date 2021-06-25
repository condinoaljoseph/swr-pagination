import { useState } from 'react';
import useSwr from 'swr';
import styles from '../styles/Home.module.css';

const fetcher = (url) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 3;
const TOTAL_ARTICLES = 30;
const TOTAL_PAGES = Math.ceil(TOTAL_ARTICLES / PAGE_SIZE);

export async function getServerSideProps(context) {
	const articles = await fetcher(
		`https://dev.to/api/articles?page=1&per_page=${PAGE_SIZE}`
	);

	return { props: { articles } };
}

function Page({ articles }) {
	const [pageIndex, setPageIndex] = useState(1);

	const { data } = useSwr(
		`https://dev.to/api/articles?page=${pageIndex}&per_page=${PAGE_SIZE}`,
		fetcher,
		{ dedupingInterval: 10000, initialData: articles }
	);

	if (!data) return <h1>Loading</h1>;

	const firstDiff = pageIndex - 3;
	const lastDiff = pageIndex + 2 - TOTAL_PAGES;

	// get middle pages
	const pages = [];
	if (firstDiff <= 0) {
		for (let i = 2; i <= 5 && i < TOTAL_PAGES; i++) pages.push(i);
	} else if (lastDiff >= 0) {
		for (let i = TOTAL_PAGES - 4, ctr = 2; ctr <= 5; i++, ctr++) {
			if (i !== 1) pages.push(i);
		}
	} else {
		pages.push(pageIndex - 1);
		pages.push(pageIndex);
		pages.push(pageIndex + 1);
	}

	let midPages = pages.map((pageCount, index) => {
		return (
			<button
				onClick={() => {
					setPageIndex(pageCount);
				}}
			>
				{pageCount}
			</button>
		);
	});

	return (
		<div className={styles.main}>
			<p>{pageIndex}</p>
			<ul>
				{data.map(({ id }) => (
					<li key={id}>{id}</li>
				))}
			</ul>
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
		</div>
	);
}

export default Page;
