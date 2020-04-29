import React from 'react';
import { } from 'prop-types';
import cn from 'classnames';
import styles from './styles.scss';

export function SegmentsBrowser({
	onHover,
	segments,
	selectedSegment,
}) {
	return (
		<div className={styles.container}>
			{segments.map((segment) => (
				<div
					key={segment.id}
					data-propname={segment.propName}
					name={segment.propName}
					className={cn(
						styles.segment,
						{ [styles.selected]: selectedSegment === segment.propName },
					)}
					onMouseOver={onHover}
				>
					<h5 data-propname={segment.propName}>{segment.name}</h5>
					<p data-propname={segment.propName}>{segment.description}</p>
				</div>
			))}
		</div>
	);
}

SegmentsBrowser.propTypes = {};