export const DIVIDER = '::';

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

export function reduceTypesChain(
	{
		selectedMap = {},
		scopedSizechart = {},
		radioGroups,
		formSelector,
		selectedKey,
		radioSelectorBase = '',
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
		radios,
	}) {
	const plural = `${type}s`;
	const scopeChildren = scopedSizechart[plural] || {};
	const keyOfSelectedChild = selectedMap[type];
	const selectedChild = scopeChildren[keyOfSelectedChild] || Object.values(scopeChildren)[0] || {};
	const formKey = formEntryKey || (dropDown ? 'id' : 'name');

	// first recursion/iteration
	if (!formSelector) {
		return {
			...accumulator,
			selectedMap,
			scopedSizechart: selectedChild,
			radioSelectorBase,
			radioGroups: {
				[plural]: {
					...radios,
					formKey,
					radioSelectorBase,
					options: Object.values(scopeChildren),
				},
			},
			formSelector: plural,
			selectedKey: keyOfSelectedChild,
			// use input props
			formKey,
			textInput,
			dropDown,
			button,
			presetInputValues,
		};
	}

	// once recursion/iteration has stopped
	if (!selectedKey) {
		// // show children down the tree even if not selected
		// if (Object.keys(selectedChild).length > 0) {
		// 	return {
		// 		formSelector,
		// 		radioGroups: {
		// 			...radioGroups,
		// 			[plural]: {
		// 				...radios,
		// 				formKey,
		// 				radioSelectorBase: newRadioSelectorBase,
		// 				options: Object.values(scopeChildren),
		// 			},
		// 		},
		// 		// textInput,
		// 		...accumulator,
		// 	};
		// }
		// final return state
		return {
			formSelector,
			radioGroups,
			// textInput,
			...accumulator,
		};
	}

	// special case for inhertiting the same type
	if (inheritType) {
		return {
			selectedKey,
			selectedMap,
			scopedSizechart: selectedChild,
			radioGroups,
			formSelector,
			// use input props
			formKey,
			textInput,
			dropDown,
			button,
			presetInputValues,
			radioSelectorBase,
		};
	}

	const newRadioSelectorBase = radioSelectorBase
		? radioSelectorBase + selectedKey + DIVIDER
		: selectedKey + DIVIDER;

	// standard case
	return {
		...accumulator,
		selectedKey: keyOfSelectedChild,
		selectedMap,
		scopedSizechart: selectedChild,
		radioSelectorBase: newRadioSelectorBase,
		radioGroups: {
			...radioGroups,
			[plural]: {
				...radios,
				formKey,
				radioSelectorBase: newRadioSelectorBase,
				options: Object.values(scopeChildren),
			},
		},
		formSelector: `${formSelector}.${selectedKey}.${plural}`,
		// use input props
		formKey,
		textInput,
		dropDown,
		button,
		presetInputValues,
	};
}

export const TYPES_CHAIN = [
	{
		type: 'brand',
		textInput: {
			label: 'Brand',
		},
		button: {
			children: 'Add brand',
		},
		radios: {
			header: 'Brands',
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
		radios: {
			header: 'Collections',
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
		radios: {
			header: 'Garments',
			getRadioLabel: ({ id }, { garments }) => garments[id].name,
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
		radios: {
			header: 'Fits',
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
		radios: {
			header: 'Sizes',
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
		radios: {
			header: 'Measurements',
			getRadioLabel: ({ segmentId, mm }, { segments }) => `${segments[segmentId].name} : ${mm}`,
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