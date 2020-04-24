import React from 'react';
import cn from 'classnames';
import { SVG } from '../../ui';
import styles from './styles.scss';

export function Loading({
	className,
	size = 100,
	...props
}) {
	return (
		<SVG
			width={size} height={size} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"
			{...props}
			className={cn(styles.loading, className)}
		>
			<path fill="none" stroke="#000000" strokeWidth="8" strokeDasharray="42.76482137044271 42.76482137044271" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" strokeLinecap="round">
				<animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="2.4390243902439024s" keyTimes="0;1" values="0;256.58892822265625"></animate>
			</path>
		</SVG>
	);
}

Loading.propTypes = {};