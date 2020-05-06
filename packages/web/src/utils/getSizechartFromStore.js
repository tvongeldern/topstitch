function reduceSizechart({
	sizechart,
	...rest
}, [subStoreName, subStore]) {
	return {
		...rest,
		sizechart: {
			...sizechart,
			[subStoreName]: Object.values(subStore),
		},
	};
}

/**
 * Reduces store to a sizechart based on a brand
 * INCOMPLETE / NOT WORKING
 * @param {*} param0 
 */
export function getSizechartFromStore({
	store: {
		brands: { brands },
		collections: { collections },
		garments: { garments },
		fits: { fits },
		sizes: { sizes },
		measurements: { measurements },
		segments: { segments },
	},
	brandId,
}) {
	const { sizechart } = Object.entries({
		brands,
		collections,
		garments,
		fits,
		sizes,
		measurements,
		segments,
	}).reduce(reduceSizechart, { sizechart: brands[brandId] });
	return sizechart;
}
