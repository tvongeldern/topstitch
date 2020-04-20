import React from 'react';
import { } from 'prop-types';
import styles from './styles.scss';

export function SVG({ children, ...rest }) {
	return (
		<svg
			version="1.1"
			fill="none"
			stroke="none"
			strokeLinecap="round"
			strokeMiterlimit="10"
			xlink="http://www.w3.org/1999/xlink"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			{...rest}
		>
			{children}
		</svg>
	);
}

SVG.propTypes = {};