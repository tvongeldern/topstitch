import { Page, GarmentView } from '@components';
import { Shirt } from '@garment-builders';
import { getGarment, getGarmentSegments } from '@state/actions';

const MEASUREMENTS = {
	// hipWidth: 32,
	// waistWidth: 33,
	chestWidth: 22,
	// shoulderWidth: 40,
	// neckWidth: 16,
	// hipToArmpitHeight: 26,
	// hipToNeckHeightFront: 32,
	hipToNeckHeightSide: 30,
	// sleeveLengthOuter: 14,
	// sleeveWidthElbow: 10,
	// sleeveWidthShoulder: 14,
	// neckToShoulderLength: 12,
	// collarThickness: 2,
};

export default function GarmentPage({ slug }) {
	return (
		<Page>
			<GarmentView garment={Shirt} measurements={MEASUREMENTS} />
		</Page>
	);
};

GarmentPage.populate = [getGarment, getGarmentSegments];
