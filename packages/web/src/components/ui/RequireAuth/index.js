import React from 'react';
import { node, object } from 'prop-types';
import { useRouter } from 'next/router';
import styles from './styles.scss';

function redirect(router) {
	const { asPath, pathname } = router;
	return function clickHandler(event) {
		event.preventDefault();
		router.push({
			pathname: '/signup',
			query: {
				redirect: pathname,
				as: asPath,
			},
		});
	}
}

export function RequireAuth({ children, me }) {
	if (me) {
		return children;
	}
	const router = useRouter();
	return (
		<span onClick={redirect(router)}>
			{children}
		</span>
	);
}

RequireAuth.propTypes = {
	children: node.isRequired,
	me: object,
};

RequireAuth.defaultProps = {
	me: null,
};
