import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<p>A list of all of the concerts I&apos;ve been to. </p>
				<p>Regardless of whether I liked it or not.</p>
			</div>
		</main>
	);
}
