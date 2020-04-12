import { useEffect } from 'react';
import { Page, Shirt_ShortSleeves } from '@components';
import { getGarmentType } from '@state/garmentTypes';
import { populatePage, useActionCreators } from '@utils';

import axios from 'axios';

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

export default function GarmentTypePage({ slug }) {
	// const [dispatchGetGarment] = useActionCreators(getGarmentType);
	// useEffect(() => {
	// 	dispatchGetGarment({ slug: 'tshirt' });
	// }, []);
	return (
		<Page>
			<Shirt_ShortSleeves measurements={MEASUREMENTS} />
		</Page>
	);
};

GarmentTypePage.populate = [getGarmentType];
