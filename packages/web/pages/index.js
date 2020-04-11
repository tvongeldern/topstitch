import { Page, Shirt_ShortSleeves, Trapezoid } from '@components';

const MEASUREMENTS = {
		hipWidth: 32,
		waistWidth: 33,
		armpitWidth: 34,
		shoulderWidth: 38,
		neckWidth: 16,
		hipToArmpitHeight: 26,
		hipToNeckHeightFront: 34,
		hipToNeckHeightSide: 42,
		hipToShoulderHeight: 36,
		outerSleeveLength: 14,
		sleeveWidthElbow: 10,
		sleeveWidthShoulder: 14,
		neckToShoulderLength: 12,
		collarThickness: 2,
};

export default function Homepage() {
	return (
		<Page>
			<Shirt_ShortSleeves measurements={MEASUREMENTS} />
		</Page>
	);
};
