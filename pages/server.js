import { useState, Fragment } from 'react';
import useSwr from 'swr';
import Pagination from '../components/Pagination';
import styles from '../styles/Home.module.css';

const fetcher = (url) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 3;
const TOTAL_ARTICLES = 30;
const TOTAL_PAGES = Math.ceil(TOTAL_ARTICLES / PAGE_SIZE);

function Page({ articles }) {
	const [pageIndex, setPageIndex] = useState(1);

	const { data } = useSwr(
		`https://dev.to/api/articles?page=${pageIndex}&per_page=${PAGE_SIZE}`,
		fetcher,
		{ dedupingInterval: 10000, initialData: articles }
	);

	if (!data) return <h1>Loading</h1>;

	return (
		<Fragment>
			<div className={styles.container}>
				<p>{pageIndex}</p>
				<ul>
					{data.map(({ id, title }) => (
						<li key={id}>
							<strong>{id}</strong>: {title}
						</li>
					))}
				</ul>
				<Pagination page={pageIndex} count={TOTAL_PAGES} showEllipsis={false} />
			</div>
		</Fragment>
	);
}

Page.getInitialProps = async (ctx) => {
	const articles = await fetcher(
		`https://dev.to/api/articles?page=1&per_page=${PAGE_SIZE}`
	);

	return { articles };
};

export default Page;
