import React from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';
import styles from './styles.scss';

export function Page({ children }) {
	return (
		<div className={styles.container}>
			{children}
		</div>
	);
}

Page.propTypes = {
	children: oneOfType([node, arrayOf(node)]),
};

Page.defaultProps = {
	children: null,
};
