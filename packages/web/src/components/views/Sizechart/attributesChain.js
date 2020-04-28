export const DIVIDER = '::::';

export function reduceAttributesChain(
	{
		radioGroups = {},
		scopedSizechart,
		selected,
		selectedObject,
	},
	{
		attribute,
		...rest
	}) {
		const [
			selectedAttribute,
			selectedKey,
			selectedValue,
		] = selected.split(DIVIDER);
	const members = scopedSizechart[attribute] || [];
	const attributeIsSelected = selectedAttribute === attribute;
	const selectedChild = attributeIsSelected && members.find((obj) => obj[selectedKey] === selectedValue);
	return {
		scopedSizechart: selectedChild || members[0] || {},
		measurements: members,
		selected,
		selectedObject: selectedChild || selectedObject,
		selectedAttribute,
		radioGroups: {
			...radioGroups,
			[attribute]: {
				attribute,
				members,
				...rest,
			},
		},
	}
}

export const SIZECHART_ATTRIBUTES_CHAIN = [
	{
		attribute: 'brands',
	},
	{
		attribute: 'collections',
	},
	{
		attribute: 'garments',
	},
	{
		attribute: 'fits',
	},
	{
		attribute: 'sizes',
	},
	{
		attribute: 'measurements',
		getLabel: ({ average, segment }) => `${segment.name} : ${average}`,
	},
];
