import React from 'react';
import { } from 'prop-types';
import styles from './styles.scss';

export function InteractiveImageViewer({
	textHeader,
	svgHeader,
	svg,
	textModule,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				{svgHeader && <h2 className={styles.header}>{svgHeader}</h2>}
				{svg}
			</div>

			<div className={styles.textModule}>
				{textHeader && <h2 className={styles.header}>{textHeader}</h2>}
				{textModule}
			</div>
		</div>
	);
}

InteractiveImageViewer.propTypes = {};