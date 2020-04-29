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
	const [
		selectedAttribute,
		selectedId
	] = selected.split(DIVIDER);
	const selectedChild = getSelectedChild({
		attribute,
		members,
		selectedAttribute,
		selectedId,
	});
	const defaultSelected = !selectedChild && (members[0] || {});
	return {
		// pass through
		selected,
		selectedAttribute,
		// reduce
		nameChain: nameChain ? [...nameChain, scopedSizechart.name] : [],
		scopedSizechart: selectedChild || defaultSelected,
		selectedObject: selectedChild || selectedObject,
		radioGroups: {
			...radioGroups,
			[attribute]: {
				defaultSelected: defaultSelected.id,
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
