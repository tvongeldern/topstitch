import React from 'react';
import { } from 'prop-types';
import cn from 'classnames';
import { Sizechart } from '../Sizechart';
import styles from './styles.scss';

export function SizesBrowser({
	measurementSets,
	sizechart,
	stageMeasurementSet,
	viewMeasurementSet,
	view,
}) {
	return (
		<div className={styles.container}>
			<Sizechart
				onChange={stageMeasurementSet}
				sizechart={sizechart}
				browseMode
			/>

			<div className={styles.menu}>
				{measurementSets.map(({ name }) => (
					<div
						className={cn(
							styles.measurementSet,
							{ [styles.viewed]: view.includes(name) },
						)}
						key={name}
					>
						<label
							onClick={viewMeasurementSet}
							data-value={name}
						>{name}</label>
					</div>
				))}
			</div>
		</div>
	);
}

SizesBrowser.propTypes = {};