import React from 'react';
import { } from 'prop-types';
import { Button } from '@components/ui';
import { Sizechart } from '../Sizechart';
import { SizesBrowser } from '../SizesBrowser'
import styles from './styles.scss';

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
		</div>
	);
}

SizechartSizesComparisonView.propTypes = {};
