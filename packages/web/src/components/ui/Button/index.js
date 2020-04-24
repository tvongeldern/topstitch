import React from 'react';
import { any, arrayOf, bool, node, oneOfType } from 'prop-types';
import cn from 'classnames';
import { Loading } from '@components/icons';
import styles from './styles.scss';

export function Button({
	children,
	className,
	error,
	success,
	loading,
	...rest
}) {
	const buttonClass = cn(styles.button, className, {
		[styles.error]: error,
		[styles.loading]: loading,
		[styles.success]: success,
	});
	return (
		<button className={buttonClass} {...rest}>
			<span className={styles.buttonText}>
				{loading ? <Loading size={24} color="white" /> : children}
			</span>
		</button>
	);
}

Button.propTypes = {
	children: oneOfType([node, arrayOf(node)]),
	loading: bool,
	error: any,
	success: any,
};

Button.defaultProps = {
	children: null,
	loading: false,
	error: null,
	success: null,
};
