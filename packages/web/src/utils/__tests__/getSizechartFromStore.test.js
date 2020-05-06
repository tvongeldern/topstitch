import { getSizechartFromStore } from '../getSizechartFromStore';

const BRAND = {
	id: 'abcd1234-ab12-ab12-ab12-abcdef123456',
	slug: 'ralphlauren',
	name: 'Ralph Lauren',
};

const COLLECTION = {
	id: 'dcba1234-ab12-ab21-ab12-abcdef654321',
	name: 'Men',
};

const GARMENT = {
	id: 'aaaa1234-ab12-aa11-ab11-abcdef651111',
	name: 'V Neck T-Shirt',
};

const FIT = {
	id: 'bbbb1234-ab12-aa11-2222-bbbdef652222',
	name: 'Standard',
};

const SIZE = {
	id: 'cccc3333-ab12-aa11-ab11-cccccc333333',
	name: 'V Neck T-Shirt',
};

const SEGMENT = {
	id: 'dddd4444-ab12-aa11-dd44-dddddd444444',
	garmentId: GARMENT.id,
};

const MEASUREMENT = {
	id: 'ffff5555-ff55-ff55-ff55-ffffff555555',
	average: 42,
};

describe('getSizechartFromStore util', () => {
	test('should reduce store to sizechart', () => {
		const store = {
			brands: {
				brands: {
					[BRAND.id]: BRAND,
				},
			},
			collections: {
				collections: {
					[COLLECTION.id]: COLLECTION,
				},
			},
			garments: {
				garments: {
					[GARMENT.id]: GARMENT,
				},
			},
			fits: {
				fits: {
					[FIT.id]: FIT,
				},
			},
			sizes: {
				sizes: {
					[SIZE.id]: SIZE,
				},
			},
			segments: {
				segments: {
					[SEGMENT.id]: SEGMENT,
				},
			},
			measurements: {
				measurements: {
					[MEASUREMENT.id]: MEASUREMENT,
				},
			},
		};
		const sizechart = {
			...BRAND,
			collections: [
				{
					...COLLECTION,
					garments: [
						{
							...GARMENT,
							fits: [
								{
									...FIT,
									sizes: [
										{
											...SIZE,
											measurements: [
												{
													...MEASUREMENT,
													segment: SEGMENT,
												},
											],
										},
									],
								},
							],
						},
					],
				},
			],
		};
		expect(
			getSizechartFromStore({
				store,
				brandId: BRAND.id,
			}),
		).toEqual(sizechart);
	});
});
