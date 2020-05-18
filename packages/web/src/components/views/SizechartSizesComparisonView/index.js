import React from 'react';
import { } from 'prop-types';
import { LengthFormatter } from '@utils/formatters';
import { Sizechart, SizesBrowser } from '@components/pickers';
import styles from './styles.scss';

function TextSize({ name, measurements, units }) {
	return (
		<div className={styles.textSize}>
			<h5>{name}</h5>
			<div className={styles.measurements}>
				{measurements.map(({ average, id, segment }) => (
					<div className={styles.measurement} key={id}>
						<b>{segment.name}</b>
						<span>{`${LengthFormatter(units)(average)} ${units}`}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export function SizechartSizesComparisonView({
	defaultSelected,
	onSizechartChange,
	sizechart,
	sizes,
	sizesHeader,
	onSizesChange,
	selectedSavedSize,
	selectedSizechartSize,
	units,
}) {
	return (
		<div className={styles.container}>

			{sizechart && (
				<div className={styles.sizechart}>
					<Sizechart
						header={sizechart.name}
						onChange={onSizechartChange}
						sizechart={sizechart}
						initialValues={{
							selected: defaultSelected.join(Sizechart.DIVIDER),
						}}
						units={units}
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

			{selectedSavedSize && (
				<div className={styles.comparison}>
					<h3>Measurements</h3>
					{selectedSizechartSize && (
						<TextSize
							{...selectedSizechartSize}
							units={units}
						/>
					)}
					<TextSize
						{...selectedSavedSize}
						units={units}
					/>
				</div>
			)}
		</div>
	);
}

SizechartSizesComparisonView.propTypes = {};
