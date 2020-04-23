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
	loading,
	...rest
}) {
	const buttonClass = cn(styles.button, className, {
		[styles.primary]: primary,
		[styles.secondary]: secondary,
		[styles.tertiary]: tertiary,
		[styles.quaternary]: quaternary,
		[styles.loading]: loading,
	});
	return (
		<button className={buttonClass} {...rest}>
			<div className={styles.buttonText}>
				<span>
					{children}
				</span>
			</div>
		</button>
	);
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
