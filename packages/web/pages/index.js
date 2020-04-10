import { Page, Shirt_ShortSleeves, Trapezoid } from '@components';

const MEASUREMENTS = {
		hipWidth: 32,
		waistWidth: 33,
		armpitWidth: 34,
		shoulderWidth: 38,
		neckWidth: 16,
		hipToArmpitHeightLeft: 26,
		hipToArmpitHeightRight: 26,
		hipToNeckHeightCenter: 34,
		hipToNeckHeightLeft: 42,
		hipToNeckHeightRight: 42,
		hipToShoulderHeightLeft: 36,
		hipToShoulderHeightRight: 36,
		outerSleeveLengthLeft: 14,
		outerSleeveLengthRight: 14,
		sleeveWidthElbowLeft: 10,
		sleeveWidthElbowRight: 10,
		sleeveWidthShoulderLeft: 14,
		sleeveWidthShoulderRight: 14,
		neckToShoulderLengthLeft: 12,
		neckToShoulderLengthRight: 12,
		collarThickness: 2,
};

export default function Homepage() {
	return (
		<Page>
			<Shirt_ShortSleeves measurements={MEASUREMENTS} />
		</Page>
	);
};
