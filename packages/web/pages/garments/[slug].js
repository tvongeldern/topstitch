import { Page, Shirt } from '@components';
import { getGarment } from '@state/garments';

const MEASUREMENTS = {
	// hipWidth: 32,
	// waistWidth: 33,
	chestWidth: 34,
	// shoulderWidth: 36,
	// neckWidth: 16,
	// hipToArmpitHeight: 26,
	// hipToNeckHeightFront: 36,
	// hipToNeckHeightSide: 42,
	// sleeveLengthOuter: 14,
	// sleeveWidthElbow: 10,
	// sleeveWidthShoulder: 14,
	// neckToShoulderLength: 12,
	// collarThickness: 2,
};

export default function GarmentPage({ slug }) {
	return (
		<Page>
			<Shirt {...MEASUREMENTS} />
		</Page>
	);
};

GarmentPage.populate = [getGarment];
