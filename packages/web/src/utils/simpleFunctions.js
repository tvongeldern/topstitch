/**
 * Adds the absolute value of provided numbers
 * @param  {...number} args
 */
export function ADD_ABS(...args){
	return args.reduce((sum, num) => sum + Math.abs(num), 0);
}

/**
 * Empty placeholder function
 */
export function EMPTY_FUNCTION(){};

/**
 * Returns true if provided vaue is falsey
 * @param {any} value
 */
export function IS_FALSEY(v) {
	return !v;
}

/**
 * Returns name of provided object
 * @param {obj} { name } 
 */
export function RETURN_NAME({ name }) {
	return name;
};

/**
 * Returns null
 */
export function RETURN_NULL() {
	return null;
}

/**
 * Returns provided value
 * @param {any} value
 */
export function RETURN_SELF(value) {
	return value;
}

/**
 * Capitalizes first character of a string
 * @param {string} value
 */
export function CAPITALIZE(value = '') {
	return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Recuces an array of objects to a map,
 * using the `mappingKey` as the key for each object
 * @param {array} objects
 * @param {object} baseMap 
 * @param {string} mappingKey 
 */
export function REDUCE_TO_MAP(
	objects,
	baseMap = {},
	mappingKey = 'id',
) {
	return objects.reduce((mapped, obj) => ({
		...mapped,
		[obj[mappingKey]]: obj,
	}), baseMap);
}
