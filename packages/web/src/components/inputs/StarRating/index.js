import React from 'react';
import { bool, object } from 'prop-types';
import cn from 'classnames';
import { Star } from '@components/icons';
import styles from './styles.scss';

export function StarRating({ filled, input }) {
	const { name, value } = input;
	const id = `star-rating-radio-${name}-${value}`;
	return (
		<label htmlFor={id} className={cn(styles.star, { [styles.filled]: filled })}>
			<Star />
			<input type="radio" {...input} id={id} />
		</label>
	);
}

StarRating.propTypes = {
	filled: bool.isRequired,
	input: object.isRequired,
};
