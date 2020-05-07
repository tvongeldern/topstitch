import React from 'react';
import { Link } from '@components/ui';
import { Logo } from '@components/icons';
import { logOut } from '@state/auth';
import { useActionCreators, useSelector } from '@utils/hooks';
import styles from './styles.scss';

function navSelector({ auth: { me } }) {
	return me;
}

export function NavBar() {
	const me = useSelector(navSelector);
	const [dispatchLogOut] = useActionCreators(logOut);
	return (
		<>
			<div className={styles.splint} />
			<div className={styles.container}>
				<div className={styles.content}>
					<Link href="/" className={styles.logo}>
						<Logo />
					</Link>
					<div className={styles.links}>
						<Link href="/sizecharts">Sizecharts</Link>
						{!me && <Link href="/signup">Signup</Link>}
						{me && <a onClick={dispatchLogOut}>Logout</a>}
					</div>
				</div>
			</div>
		</>
	);
}
