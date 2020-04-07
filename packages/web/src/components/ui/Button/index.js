import React from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';
import styles from './styles.scss';

export function Button({ children, ...rest }) {
	return <button className={styles.button} {...rest}>{children}</button>;
}

Button.propTypes = {
	children: oneOfType([node, arrayOf(node)]),
};

Button.defaultProps = {
	children: null,
};
