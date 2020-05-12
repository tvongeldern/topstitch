import React from 'react';
import { Link } from '@components/ui';
import { Logo } from '@components/icons';
import styles from './styles.scss';

export function Footer() {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<Link href="/" className={styles.logo}>
					<Logo />
				</Link>
				<p>Topstitch | Chicago</p>
				<div className={styles.links}>
					<Link href="/faq">FAQ</Link>
					<a href="/privacy.html" target="_blank">Privacy</a>
				</div>
			</div>
		</div>
	);
}
