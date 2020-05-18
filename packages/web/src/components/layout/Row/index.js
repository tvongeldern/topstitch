import React from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';
import styles from './styles.scss';

export function Row({ children, ...rest }) {
	return (
		<div className={styles.row} {...rest}>
			{children}
		</div>
	);
}

Row.propTypes = {
	children: oneOfType([
		node,
		arrayOf(node),
	]),
};

Row.defaultProps = {
	children: null,
};
