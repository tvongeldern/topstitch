import React from 'react';
import { arrayOf, bool, node, oneOfType } from 'prop-types';
import cn from 'classnames';
import styles from './styles.scss';

export function Button({
	children,
	className,
	primary,
	secondary,
	tertiary,
	quaternary,
	...rest
}) {
	const buttonClass = cn(styles.button, className, {
		[styles.primary]: primary,
		[styles.secondary]: secondary,
		[styles.tertiary]: tertiary,
		[styles.quaternary]: quaternary,
	});
	return <button className={buttonClass} {...rest}>{children}</button>;
}

Button.propTypes = {
	children: oneOfType([node, arrayOf(node)]),
	primary: bool,
	secondary: bool,
	tertiary: bool,
	quaternary: bool,
};

Button.defaultProps = {
	children: null,
	primary: false,
	secondary: false,
	tertiary: false,
	quaternary: false,
};
