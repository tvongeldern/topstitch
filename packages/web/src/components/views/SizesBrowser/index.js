import React from 'react';
import { } from 'prop-types';
import cn from 'classnames';
import { Sizechart } from '../Sizechart';
import styles from './styles.scss';

export function SizesBrowser({
	measurementSets,
	sizechart,
	viewMeasurementSet,
	removeMeasurementSet,
}) {
	return (
		<div className={styles.container}>
			<Sizechart
				onChange={viewMeasurementSet}
				sizechart={sizechart}
				browseMode
			/>

			<div className={styles.menu}>
				{measurementSets.map(({ name }) => (
					<div
						className={styles.measurementSet}
						key={name}
					>
						<label
							onClick={removeMeasurementSet}
							data-value={name}
						>{name}</label>
					</div>
				))}
			</div>
		</div>
	);
}

SizesBrowser.propTypes = {};