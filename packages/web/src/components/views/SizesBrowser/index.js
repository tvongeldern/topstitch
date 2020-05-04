import React, { useEffect } from 'react';
import { arrayOf, func, object, string } from 'prop-types';
import { Field, Form } from 'react-final-form';
import { RadioLabel } from '@components';
import { RETURN_NULL } from '@utils';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '@constants';
import styles from './styles.scss';

function SizesBrowserForm({
	header,
	onChange,
	sizes,
	values: { size },
}) {
	useEffect(() => {
		if (size) {
			onChange(
				JSON.parse(
					size,
				),
			);
		}
	}, [size])
	return (
		<div className={styles.container}>
			{header && <h3>{header}</h3>}
			{sizes.map((size) => (
				<Field
					type="radio"
					name="size"
					component={RadioLabel}
					value={JSON.stringify(size)}
					label={size.name}
					key={size.id}
				/>
			))}
		</div>
	);
}

SizesBrowserForm.propTypes = {
	onChange: func.isRequired,
	header: string,
	sizes: arrayOf(object).isRequired,
};

SizesBrowserForm.defaultProps = {
	header: '',
};

export function SizesBrowser({
	onChange,
	sizes,
	...rest
}) {
	const initialValues = sizes[0]
		? { size: JSON.stringify(sizes[0]) }
		: EMPTY_OBJECT;
	return (
		<Form
			component={SizesBrowserForm}
			onSubmit={RETURN_NULL}
			onChange={onChange}
			sizes={sizes}
			initialValues={initialValues}
			{...rest}
		/>
	)
}

SizesBrowser.propTypes = {
	onChange: func.isRequired,
	sizes: arrayOf(object),
};

SizesBrowser.defaultProps = {
	sizes: EMPTY_ARRAY,
};