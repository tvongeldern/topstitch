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
	formatNumeric,
	parseNumeric,
	validateRequired,
} from '@utils';

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
				options={segments.map(mapToDropdownOption)}
				validate={validateRequired}
			/>

			<Field
				type="tel"
				name="average"
				label="Length"
				component={TextInput}
				format={formatNumeric}
				parse={parseNumeric}
				validate={validateRequired}
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
