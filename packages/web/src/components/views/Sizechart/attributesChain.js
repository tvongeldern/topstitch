export const DIVIDER = '::::';

function getSelectedChild({
	attribute,
	members,
	selectedAttribute,
	selectedId,
}) {
	if (selectedAttribute === attribute) {
		return members.find(({ id }) => id === selectedId);
	}
}

export function reduceAttributesChain(
	{
		measurements,
		nameChain,
		radioGroups = {},
		scopedSizechart,
		selected,
		selectedObject,
	},
	{
		attribute,
		...attributePayload
	}) {
	const members = scopedSizechart[attribute] || [];
	const [selectedAttribute, selectedId] = selected.split(DIVIDER);
	const selectedChild = getSelectedChild({
		attribute,
		members,
		selectedAttribute,
		selectedId,
	});
	return {
		// pass through
		selected,
		selectedAttribute,
		// reduce
		measurements: measurements || scopedSizechart.measurements,
		nameChain: nameChain ? [...nameChain, scopedSizechart.name] : [],
		scopedSizechart: selectedChild || members[0] || {},
		selectedObject: selectedChild || selectedObject,
		radioGroups: {
			...radioGroups,
			[attribute]: {
				attribute,
				members,
				...attributePayload,
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
