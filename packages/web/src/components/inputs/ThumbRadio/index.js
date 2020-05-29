import React from 'react';
import { bool, object, string } from 'prop-types';
import cn from 'classnames';
import { Thumb } from '@components/icons';
import styles from './styles.scss';

export function ThumbRadio({ down, input, label }) {
	const { name, value } = input;
	const id = `thumb-rating-radio-${name}-${value}`;
	return (
		<label htmlFor={id} className={cn(styles.thumb, { [styles.down]: down })}>
			<input type="radio" {...input} id={id} />
			<Thumb />
			{label && <p>{label}</p>}
		</label>
	);
}

ThumbRadio.propTypes = {
	down: bool,
	input: object.isRequired,
	label: string,
};

ThumbRadio.defaultProps = {
	down: false,
	label: '',
};
