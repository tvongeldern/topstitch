import React from 'react';
import { } from 'prop-types';
import { Link } from '@components/ui';
import { TextInput } from '@components/inputs';
import styles from './styles.scss';

export function NavBar() {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<input type="text" placeholder="Search" />
				<div className={styles.links}>
					<Link href="/">Home</Link>
					<Link href="/login">Login</Link>
				</div>
			</div>
		</div>
	);
}

NavBar.propTypes = {};