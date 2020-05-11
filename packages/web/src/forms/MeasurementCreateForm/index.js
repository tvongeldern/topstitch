import React from 'react';
import { arrayOf, func, object } from 'prop-types';
import { Field } from 'react-final-form';
import {
	Button,
	Dropdown,
	Link,
	TextInput,
} from '@components';
import { formatDropdownOption } from '@utils';

export function MeasurementCreateForm({
	deleteSize,
	garment,
	handleSubmit,
	segments,
	values: { size },
}) {
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
				options={segments.map(formatDropdownOption)}
			/>

			<Field
				name="average"
				label="Length"
				component={TextInput}
			/>

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
