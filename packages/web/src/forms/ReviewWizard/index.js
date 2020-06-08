import React, { useEffect } from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import {
	Button,
	Link,
	StarRadio,
	Success,
	TextArea,
} from '@components';
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

export function ReviewWizard({
	handleSubmit,
	sizechart,
	slug,
	submitError,
	submitSucceeded,
	values: {
		displayName,
		rating = 0,
		review,
	},
}) {
	return (
		<form onSubmit={handleSubmit}>

			{submitSucceeded ? (
				<div className={styles.step}>
					<h3 className={styles.success}>
						<Success />
						<span>Review submitted!</span>
					</h3>

					<Link href="/sizecharts/[slug]" as={`/sizecharts/${slug}`}>
						{`Back to ${sizechart.name} sizechart`}
					</Link>
				</div>
			) : (
					<div className={styles.step}>
						<h3>{sizechart.name}</h3>

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
							label="Review sizechart"
							component={TextArea}
							rows={4}
							defaultValue={INITIAL_REVIEW_VALUES[rating]}
						/>

						<p className={styles.error}>{submitError}</p>

						<Button
							disabled={!rating || !review}
							type="submit"
						>
							Submit
					</Button>
				</div>
			)}
		</form>
	);
}

ReviewWizard.propTypes = {
	handleSubmit: func.isRequired,
};
