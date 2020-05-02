import React from 'react';
import { } from 'prop-types';
import styles from './styles.scss';

export function SizesBrowser({
	header,
	onChange,
	sizes,
}) {
	return (
		<div className={styles.container}>
			{header && <h3>{header}</h3>}
			{sizes.map((size) => (
				<div
					className={styles.measurementSet}
					key={size.id}
				>
					<label
						onClick={() => onChange(size)}
					>{size.name}</label>
				</div>
			))}
		</div>
	);
}

SizesBrowser.propTypes = {};