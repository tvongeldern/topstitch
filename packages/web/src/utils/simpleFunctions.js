import { EMPTY_OBJECT } from '@constants';

export const IS_TRUTHY = (v) => v;

export const IS_FALSEY = (v) => !v;

export const NEAREST_EVEN = (n) => 2 * Math.round(n / 2);

export const ADD_ABS = (...args) => args.reduce((sum, num) => sum + Math.abs(num), 0);

export const RETURN_EMPTY_OBJECT = () => EMPTY_OBJECT;

/**
 * Recuces an array of objects to a map,
 * using the `mappingKey` as the key for each object
 * @param {array} objects
 * @param {object} baseMap 
 * @param {string} mappingKey 
 */
export function reduceObjectsToMap(
	objects,
	baseMap = {},
	mappingKey = 'id',
) {
	return objects.reduce((mapped, obj) => ({
		...mapped,
		[obj[mappingKey]]: obj,
	}), baseMap);
}
