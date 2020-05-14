import React from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';
import styles from './styles.scss';

export function Column({ children }) {
	return (
		<div className={styles.column}>
			{children}
		</div>
	);
}

Column.propTypes = {
	children: oneOfType([
		node,
		arrayOf(node),
	]),
};

Column.defaultProps = {
	children: null,
};
