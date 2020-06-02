import React, { useEffect } from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import {
	Button,
	ButtonRadio,
	Link,
	Sizechart,
	StarRadio,
	Success,
	TextArea,
	ThumbRadio,
} from '@components';
import { mapToDropdownOption } from '@utils';
import { EMPTY_OBJECT } from '@constants';
import styles from './styles.scss';

const STAR_RATINGS = [1, 2, 3, 4, 5];
const INITIAL_REVIEW_VALUES = [
	'',
	'Terrible!',
	'I expected better.',
	'Meh',
	'Good.',
	'Great!',
];

function ThumbsGroup({ name, header, value }) {
	return (
		<div className={styles.inputContainer}>
			<label>{header}</label>

			<div className={styles.thumbsContainer}>
				<Field
					component={ThumbRadio}
					type="radio"
					name={name}
					value="-1"
					down
				/>

				<Field
					component={ThumbRadio}
					type="radio"
					name={name}
					value="1"
				/>

				{value && (
					<Field
						component={ButtonRadio}
						type="radio"
						name={name}
						label="Clear"
					/>
				)}
			</div>
		</div>
	);
}

function sizechartChangeHandler(form) {
	return function handleSizechartChange({
		defaultSelected: [brand, collection, garment, fit, size],
		displayName,
		selectedAttribute,
	}) {
		if (selectedAttribute === 'size') {
			form.change('displayName', displayName);
			form.change('brand', brand);
			form.change('collection', collection);
			form.change('garment', garment);
			form.change('fit', fit);
			form.change('size', size);
		}
	}
}

export function ReviewWizard({
	form,
	handleSubmit,
	sizechart,
	slug,
	submitSucceeded,
	units,
	values: {
		displayName,
		quality,
		rating = 0,
		review,
		size,
		sizing,
		step = 1,
		shipping,
	},
}) {
	useEffect(() => {
		if (submitSucceeded) {
			form.change('step', 4);
		}
	}, [submitSucceeded]);
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
						Next
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
									component={StarRadio}
									key={value}
									value={value}
									filled={rating >= value}
									parse={parseFloat}
								/>
							))}
						</div>
					</div>
					<Field
						name="review"
						label="Review"
						component={TextArea}
						rows={4}
						defaultValue={INITIAL_REVIEW_VALUES[rating]}
					/>

					<Button
						disabled={!rating || !review}
						onClick={() => form.change('step', 3)}
					>
						Next
					</Button>

				</div>
			)}

			{step === 3 && (
				<div className={styles.step}>
					<h4>Optional Ratings</h4>
					
					<ThumbsGroup
						value={shipping}
						name="shipping"
						header="Shipping"
					/>

					<ThumbsGroup
						value={sizing}
						name="sizing"
						header="Sizing"
					/>

					<ThumbsGroup
						value={quality}
						name="quality"
						header="Quality"
					/>

					<Button type="submit">Submit review</Button>
				</div>
			)}

			{step === 4 && (
				<div className={styles.step}>
					<h3 className={styles.success}>
						<Success />
						<span>Review submitted!</span>
					</h3>

					<Link href="/sizecharts/[slug]" as={`/sizecharts/${slug}`}>
						{`Back to ${sizechart.name} sizechart`}
					</Link>
				</div>
			)}
		</form>
	);
}

ReviewWizard.propTypes = {
	handleSubmit: func.isRequired,
};
