import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import {
	Button,
	Sizechart,
	StarRating,
	TextArea,
} from '@components';
import styles from './styles.scss';

const STAR_RATINGS = [1, 2, 3, 4, 5];

function sizechartChangeHandler(form) {
	return function handleSizechartChange({
		displayName,
		selectedAttribute,
		selectedObject,
	}) {
		if (selectedAttribute === 'size') {
			form.change('size', selectedObject.id);
			form.change('displayName', displayName);
		}
	}
}

export function ReviewWizard({
	form,
	handleSubmit,
	sizechart,
	units,
	values: {
		displayName,
		size,
		step = 1,
		rating,
	},
}) {
	return (
		<form onSubmit={handleSubmit}>

			{step == 1 && (
				<div className={styles.step}>
					<h2>{`Review ${sizechart.name}`}</h2>
					<h5>Select the size that you purchased</h5>
					<Sizechart
						browseMode
						sizechart={sizechart}
						units={units}
						onChange={sizechartChangeHandler(form)}
					/>

					<Button
						disabled={!size}
						onClick={() => form.change('step', 2)}
					>
						Select Size
					</Button>
				</div>
			)}

			{step == 2 && (
				<div className={styles.step}>
					<h2>{displayName}</h2>
					<div className={styles.inputContainer}>
						<label>Rating</label>
						<div className={styles.stars}>
							{STAR_RATINGS.map((value) => (
								<Field
									name="rating"
									type="radio"
									component={StarRating}
									key={value}
									value={value}
									filled={rating >= value}
								/>
							))}
						</div>
					</div>
					<Field
						name="review"
						label="Review"
						component={TextArea}
						rows={4}
					/>
				</div>
			)}
		</form>
	);
}

ReviewWizard.propTypes = {
	handleSubmit: func.isRequired,
};
