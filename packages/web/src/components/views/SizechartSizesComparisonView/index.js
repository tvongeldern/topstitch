import React from 'react';
import { } from 'prop-types';
import { Button } from '@components/ui';
import { Sizechart } from '../Sizechart';
import { SizesBrowser } from '../SizesBrowser'
import styles from './styles.scss';

function TextSize({ name, measurements }) {
	return (
		<div className={styles.textSize}>
			<h5>{name}</h5>
			<div className={styles.measurements}>
				{measurements.map(({ average, id, segment }) => (
					<div className={styles.measurement} key={id}>
						<b>{segment.name}</b>
						<span>{average}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export function SizechartSizesComparisonView({
	onSizechartChange,
	sizechart,
	sizes,
	sizesHeader,
	onSizesChange,
	selectedSavedSize,
	selectedSizechartSize,
}) {
	return (
		<div className={styles.container}>

			{sizechart && (
				<div className={styles.sizechart}>
					<Sizechart
						onChange={onSizechartChange}
						sizechart={sizechart}
						browseMode
					/>
				</div>
			)}

			{sizes && sizes.length > 0 && (
				<div className={styles.sizesBrowser}>
					<SizesBrowser
						sizes={sizes}
						header={sizesHeader}
						onChange={onSizesChange}
					/>
				</div>
			)}

			{(selectedSavedSize || selectedSizechartSize) && (
				<div className={styles.comparison}>
					<h3>Measurements</h3>
					{selectedSavedSize && (
						<TextSize {...selectedSavedSize} />
					)}
					{selectedSizechartSize && (
						<TextSize {...selectedSizechartSize} />
					)}
				</div>
			)}
		</div>
	);
}

SizechartSizesComparisonView.propTypes = {};
