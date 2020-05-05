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
		// in
		selected,
		scopedSizechart,
		// transitory
		selectedIds = selected.split(DIVIDER),
		trailingNameChain,
		// out
		idChain,
		displayName,
		radioGroups = {},
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
	const selectedId = selectedIds[index];
	const selectedChild = getSelectedChild({
		members,
		selectedId,
	});
	const defaultSelected = !selectedChild && (members[0] || {});
	const nextIterationScope = selectedChild || defaultSelected;
	const nextIterationIdChain = idChain ? [...idChain, scopedSizechart.id] : [];
	const nameChain = !trailingNameChain ? [] : trailingNameChain.concat(scopedSizechart.name);
	return {
		// pass through
		selectedIds,
		// reduce
		trailingNameChain: nameChain,
		idChain: nextIterationIdChain,
		scopedSizechart: selectedChild || defaultSelected,
		// out
		displayName: !selectedId && !displayName ? nameChain.join(' ') : displayName,
		selectedAttribute: selectedChild ? attribute : selectedAttribute,
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
