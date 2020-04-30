export const DIVIDER = '::::';

function getSelectedChild({
	members,
	selectedId,
}) {
	if (selectedId) {
		return members.find(({ id }) => id === selectedId);
	}
}

export function reduceAttributesChain(
	{
		nameChain,
		idChain,
		radioGroups = {},
		scopedSizechart,
		selected,
		selectedAttribute,
		selectedObject,
	},
	{
		attribute,
		...attributePayload
	},
	index,
) {
	const members = scopedSizechart[attribute] || [];
	const selectedIds = selected.split(DIVIDER);
	const selectedId = selectedIds[index];
	const selectedChild = getSelectedChild({
		members,
		selectedId,
	});
	const defaultSelected = !selectedChild && (members[0] || {});
	const nextIterationScope = selectedChild || defaultSelected;
	const nextIterationIdChain = idChain ? [...idChain, scopedSizechart.id] : [];
	const nextIterationNameChain = nameChain ? [...nameChain, scopedSizechart.name] : [];
	return {
		// pass through
		selected,
		selectedAttribute: selectedAttribute || (selectedId && attribute),
		// reduce
		nameChain: nextIterationNameChain,
		idChain: nextIterationIdChain,
		scopedSizechart: selectedChild || defaultSelected,
		selectedObject: selectedChild || selectedObject,
		radioGroups: {
			...radioGroups,
			[attribute]: {
				attribute,
				baseValue: nextIterationIdChain.join(DIVIDER),
				members,
				selectedId: nextIterationScope.id,
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
