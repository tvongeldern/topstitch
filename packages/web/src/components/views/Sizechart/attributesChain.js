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
		scope,
		// transitory
		selectedIds = selected.split(DIVIDER),
		trailingNameChain,
		// out
		trailingIdChain = [],
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
	const members = scope[attribute] || [];
	const selectedId = selectedIds[index];
	const selectedChild = getSelectedChild({
		members,
		selectedId,
	});
	const defaultSelected = !selectedChild && (members[0] || {});
	const nextIterationScope = selectedChild || defaultSelected;
	const idChain = scope.id ? trailingIdChain.concat(scope.id) : trailingIdChain;
	const nameChain = !trailingNameChain ? [] : trailingNameChain.concat(scope.name);
	return {
		// pass through
		selectedIds,
		// reduce
		trailingNameChain: nameChain,
		trailingIdChain: idChain,
		scope: selectedChild || defaultSelected,
		// out
		displayName: !selectedId && !displayName ? nameChain.join(' ') : displayName,
		selectedAttribute: selectedId ? attribute.slice(0, -1) : selectedAttribute,
		selectedObject: selectedChild || selectedObject,
		radioGroups: {
			...radioGroups,
			[attribute]: {
				attribute,
				baseValue: idChain.join(DIVIDER),
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
