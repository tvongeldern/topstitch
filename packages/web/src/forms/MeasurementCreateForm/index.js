import React from 'react';
import { arrayOf, func, object } from 'prop-types';
import { Field } from 'react-final-form';
import {
	Button,
	Dropdown,
	Link,
	TextInput,
} from '@components';
import {
	mapToDropdownOption,
	validateRequired,
} from '@utils';
import styles from './styles.scss';

function getSegmentId({ segment: { id } }) {
	return id;
}

export function MeasurementCreateForm({
	deleteSize,
	dirtySinceLastSubmit,
	garment,
	handleSubmit,
	segments,
	submitError,
	values: { size },
}) {
	const segmentIds = size.measurements.map(getSegmentId);
	const segmentOptions = segments
		.filter(
			({ id }) => !segmentIds.includes(id),
		)
		.map(mapToDropdownOption);
	return (
		<form onSubmit={handleSubmit}>

			<Link href={`/models/${garment.slug}`} target="_blank">
				{`How to measure a ${garment.name}`}
			</Link>

			<Field
				name="segmentId"
				placeholder="Select one"
				label="Measurement"
				component={Dropdown}
				options={segmentOptions}
				validate={validateRequired}
			/>

			<Field
				type="tel"
				name="average"
				label="Length"
				component={TextInput}
				validate={validateRequired}
			/>

			{submitError && !dirtySinceLastSubmit && (
				<p className={styles.error}>{submitError}</p>
			)}

			<Button type="submit">Add measurement</Button>

			<a onClick={() => deleteSize(size)}>
				{`Delete ${size.name} size`}
			</a>

		</form>
	);
}

MeasurementCreateForm.propTypes = {
	handleSubmit: func.isRequired,
	segments: arrayOf(object).isRequired,
};
