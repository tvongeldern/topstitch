import React from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';
import styles from './styles.scss';

export function FormSizechartContainer({ children }) {
	return (
		<div className={styles.container}>
			{children}
		</div>
	);
}

FormSizechartContainer.propTypes = {
	children: oneOfType([
		node,
		arrayOf(node),
	]).isRequired,
};
