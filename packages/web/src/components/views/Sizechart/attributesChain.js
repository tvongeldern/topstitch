import { LengthFormatter } from '@utils/formatters';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '@constants';

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
		units,
		// transitory
		selectedIds = selected.split(DIVIDER),
		trailingNameChain,
		trailingIdChain = EMPTY_ARRAY,
		// out
		displayName,
		parents,
		radioGroups = EMPTY_OBJECT,
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
	const defaultSelected = !selectedChild && (members[0] || EMPTY_OBJECT);
	const nextIterationScope = selectedChild || defaultSelected;
	const idChain = scope.id ? trailingIdChain.concat(scope.id) : trailingIdChain;
	const nameChain = !trailingNameChain ? [] : trailingNameChain.concat(scope.name);
	return {
		// pass through
		selectedIds,
		units,
		// reduce
		trailingNameChain: nameChain,
		trailingIdChain: idChain,
		scope: selectedChild || defaultSelected,
		// out
		displayName: !selectedId && !displayName ? nameChain.join(' ') : displayName,
		selectedAttribute: selectedId ? attribute.slice(0, -1) : selectedAttribute,
		selectedObject: selectedChild || selectedObject,
		parents: selectedId ? idChain : parents,
		defaultSelected: idChain,
		radioGroups: {
			...radioGroups,
			[attribute]: {
				attribute,
				baseValue: idChain.join(DIVIDER),
				members,
				selectedId: nextIterationScope.id,
				units,
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
		getLabel: ({ average, segment }, units) => `${segment.name} : ${LengthFormatter(units)(average)} ${units}`,
	},
];
