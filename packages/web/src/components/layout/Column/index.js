import React from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';
import styles from './styles.scss';

export function Column({ children, ...rest }) {
	return (
		<div className={styles.column} {...rest}>
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
