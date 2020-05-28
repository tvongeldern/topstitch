import React from 'react';
import { SVG } from '@components/ui';
import styles from './styles.scss';

export function Star({ size = 36, ...props }) {
	return (
		<SVG
			enableBackground="new 0 0 24 24"
			viewBox="0 0 24 24"
			height={size}
			width={size}
			{...props}
			className={styles.svg}
		>
			<g>
				<rect fill="none" height="24" width="24" />
				<path d="M14.43,10l-1.47-4.84c-0.29-0.95-1.63-0.95-1.91,0L9.57,10H5.12c-0.97,0-1.37,1.25-0.58,1.81l3.64,2.6l-1.43,4.61 c-0.29,0.93,0.79,1.68,1.56,1.09L12,17.31l3.69,2.81c0.77,0.59,1.85-0.16,1.56-1.09l-1.43-4.61l3.64-2.6 c0.79-0.57,0.39-1.81-0.58-1.81H14.43z" />
			</g>
		</SVG>
	);
}