import React from 'react';
import { arrayOf, node } from 'prop-types';
import styles from './styles.scss';

export function FixedWrapContainer({ children, ...rest }) {
	return (
		<div className={styles.fixedWrap} {...rest}>
			<div className={styles.container}>{children[0]}</div>
			<div className={styles.container}>{children[1]}</div>
		</div>
	);
}

FixedWrapContainer.propTypes = {
	children: arrayOf(node).isRequired,
};
