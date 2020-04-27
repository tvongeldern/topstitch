const mapOption = ([key, { id, name }]) => ({ value: id, children: name });
const getGarmentOptions = ({ selectedMap, sizechart, context }) => Object.entries(context.garments)
	.filter(([key]) => !sizechart
		.brands[selectedMap.brand]
		.collections[selectedMap.collection]
		.garments
		?.[key])
	.map(mapOption);
const getSegmentOptions = ({ selectedMap, sizechart, context }) => Object.entries(context.segments)
	.filter(([key, { garmentId }]) => garmentId === selectedMap.garment
		&& !sizechart
			.brands[selectedMap.brand]
			.collections[selectedMap.collection]
			.garments[selectedMap.garment]
			.fits[selectedMap.fit]
			.sizes[selectedMap.size]
			.measurements
		?.[key]
	)
	.map(mapOption);

export const TYPES_CHAIN = [
	{
		type: 'brand',
		textInput: {
			label: 'Brand',
		},
		button: {
			children: 'Add brand',
		},
	},
	{
		type: 'collection',
		textInput: {
			label: 'Collection',
		},
		button: {
			children: 'Add collection',
		},
	},
	{
		type: 'garment',
		dropDown: {
			label: 'Garment',
			placeholder: 'Select garment',
			options: getGarmentOptions,
		},
		button: {
			children: 'Add garment',
		},
	},
	{
		type: 'fit',
		textInput: {
			label: 'Fit',
		},
		button: {
			children: 'Add fit',
		},
	},
	{
		type: 'size',
		textInput: {
			label: 'Size',
		},
		button: {
			children: 'Add size',
		},
	},
	{
		type: 'measurement',
		formEntryKey: 'segmentId',
		dropDown: {
			label: 'Measurement',
			placeholder: 'Select one',
			name: 'input.segmentId',
			options: getSegmentOptions,
		},
		textInput: {
			label: 'Length',
			name: 'input.mm',
		},
		button: {
			children: 'Add measurement',
		},
	},
	{
		inheritType: true,
		formEntryKey: 'segmentId',
		textInput: {
			label: 'Length',
			name: 'input.mm',
		},
		button: {
			children: 'Update measurement',
		},
		presetInputValues: ({
			selectedMap: { measurement },
		}) => ({ segmentId: measurement }),
	},
];

export function reduceTypesChain(
	{
		selectedMap,
		sizechart,
		formSelector,
		selectedKey,
		...accumulator
	},
	{
		type,
		formEntryKey,
		textInput,
		dropDown,
		button,
		inheritType,
		presetInputValues,
	}) {
	const plural = `${type}s`;
	if (!formSelector) {
		return {
			...accumulator,
			selectedMap,
			sizechart,
			formSelector: plural,
			selectedKey: selectedMap[type],
			// use input props
			formEntryKey,
			textInput,
			dropDown,
			button,
			presetInputValues,
		};
	}
	if (!selectedKey) {
		return {
			formSelector,
			// textInput,
			...accumulator,
		};
	}
	if (inheritType) {
		return {
			selectedKey,
			selectedMap,
			sizechart,
			formSelector,
			// use input props
			formEntryKey,
			textInput,
			dropDown,
			button,
			presetInputValues,
		};
	}
	return {
		...accumulator,
		selectedKey: selectedMap[type],
		selectedMap,
		sizechart,
		formSelector: `${formSelector}.${selectedKey}.${plural}`,
		// use input props
		formEntryKey,
		textInput,
		dropDown,
		button,
		presetInputValues,
	};
}
