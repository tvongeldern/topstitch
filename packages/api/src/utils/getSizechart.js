import {
	Garment,
	Segment,
	Brand,
	Collection,
	Fit,
	Size,
	Measurement,
} from '@models';
import { getJSON } from './getJSON';

function reduceObjectsToMap(map, object) {
	return {
		...map,
		[object.id]: object,
	};
}

const EMPTY_OBJECT = {};

const modelsMap = [
	Garment,
	Segment,
	Brand,
	Collection,
	Fit,
	Size,
	Measurement,
].reduce((map, model) => ({
	...map,
	[model.name]: model,
}), {});

const segment = {
	model: Segment,
	attributes: ['id', 'name', 'propName'],
};

const measurement = {
	model: Measurement,
	attributes: ['average', 'id'],
	include: [segment],
};

const garment = {
	model: Garment,
	attributes: ['id', 'name', 'slug'],
};

const size = {
	model: Size,
	attributes: ['id', 'name'],
	include: [measurement],
};

const fit = {
	model: Fit,
	attributes: ['id', 'name', 'garmentId'],
	include: [size],
};

const collection = {
	model: Collection,
	attributes: ['id', 'name'],
	include: [fit, garment],
};

const brand = {
	attributes: ['id', 'name'],
	include: [collection],
};

const queryOptionsMap = {
	brand,
	collection,
	fit,
	size,
};

function assignFitsToGarments(garments, { garmentId, ...fit }) {
	const {
		collectionGarment,
		fits = [],
		...garment
	} = garments[garmentId];
	return {
		...garments,
		[garmentId]: {
			...garment,
			fits: [
				...fits,
				fit,
			],
		},
	};
}

function formatCollection({ id, name, fits, garments }) {
	const fitMap = fits.reduce(reduceObjectsToMap, EMPTY_OBJECT);
	const garmentMap = garments.reduce(reduceObjectsToMap, EMPTY_OBJECT);
	return formatSizechart({
		id,
		name,
		garments: Object.values(
			fits.reduce(assignFitsToGarments, garmentMap),
		),
	});
}

function reduceResource(formatted, [key, value]) {
	if (key === 'collections') {
		return {
			...formatted,
			collections: value.map(formatCollection),
		};
	}
	if (value instanceof Array) {
		return {
			...formatted,
			[key]: value.map(formatSizechart),
		};
	}
	if (value instanceof Object) {
		return {
			...formatted,
			[key]: formatSizechart(value),
		};
	}
	return {
		...formatted,
		[key]: value,
	};
}

function formatSizechart(resouce) {
	const entries = Object.entries(resouce);
	const reduced = entries.reduce(reduceResource, {});
	return reduced;
}

export async function getSizechart({
	type,
	id,
}) {
	const model = modelsMap[type];
	const queryOptions = queryOptionsMap[type];
	if (!model || !queryOptions) {
		throw new Error(`Type "${type}" is not valid`);
	}
	const parent = await model.findByPk(id, queryOptions);
	if (!parent) {
		throw new Error(`No ${type} found with ID ${id}`);
	}
	const json = getJSON(parent);
	return formatSizechart(json);
}
