import styles from '../styles/Home.module.css';
import Mock from '../components/mock';

function Page() {
	return (
		<div className={styles.container}>
			<h2>This child component is serverside rendered on its own</h2>
			<Mock />
		</div>
	);
}

export default Page;
