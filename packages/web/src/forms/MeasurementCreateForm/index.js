import React from 'react';
import { arrayOf, func, object } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, Dropdown, TextInput } from '@components';
import { formatDropdownOption } from '@utils';
import styles from './styles.scss';

export function MeasurementCreateForm({
	handleSubmit,
	segments,
}) {
	return (
		<form onSubmit={handleSubmit}>

			<Field
				name="segmentId"
				placeholder="Select one"
				component={Dropdown}
				options={segments.map(formatDropdownOption)}
			/>

			<Field
				name="average"
				label="Measurement"
				component={TextInput}
			/>

			<Button type="submit">Submit</Button>

		</form>
	);
}

MeasurementCreateForm.propTypes = {
	handleSubmit: func.isRequired,
	segments: arrayOf(object).isRequired,
};
