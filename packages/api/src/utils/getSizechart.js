import {
	GarmentType,
	GarmentSegment,
	Brand,
	Line,
	Collection,
	Fit,
	Size,
	Measurement,
} from '@models';
import { getJSON } from './getJSON';

const EMPTY_OBJECT = {};

const modelsMap = [
	GarmentType,
	GarmentSegment,
	Brand,
	Line,
	Collection,
	Fit,
	Size,
	Measurement,
].reduce((map, model) => ({
	...map,
	[model.name]: model,
}), {});

const measurement = {
	model: Measurement,
	attributes: ['id', 'name'],
	include: [
		{
			model: GarmentSegment,
			attributes: ['id', 'name'],
		},
	],
};

const garmentType = {
	model: GarmentType,
	attributes: ['id', 'name'],
};

const size = {
	model: Size,
	attributes: ['id', 'name'],
	include: [measurement],
};

const fit = {
	model: Fit,
	attributes: ['id', 'name'],
	include: [size, garmentType],
};

const collection = {
	model: Collection,
	attributes: ['id', 'name'],
	include: [fit],
};

const line = {
	model: Line,
	attributes: ['id', 'name'],
	include: [collection],
};

const brand = {
	attributes: ['id', 'name'],
	include: [line],
};

const queryOptionsMap = {
	brand,
	line,
	collection,
	fit,
	size,
};

function reduceFitsToMap(garmentTypes, { garmentType, ...fit }) {
	const { id } = garmentType;
	const existing = garmentTypes[id] || {};
	return {
		...garmentTypes,
		[id]: {
			...existing,
			...garmentType,
			fits: [
				...(existing.fits || []),
				fit,
			],
		},
	};
}

function formatCollection({ id, name, fits }) {
	return formatSizechart({
		id,
		name,
		garmentTypes: Object.values(fits.reduce(reduceFitsToMap, EMPTY_OBJECT)),
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
	try {
		const parent = await model.findByPk(id, queryOptions);
		if (!parent) {
			throw new Error(`No ${type} found with ID ${id}`);
		}
		const json = getJSON(parent);
		return formatSizechart(json);
	} catch (error) {
		console.log(error);
		throw new Error(`Invalid ${type} ID`);
	}
}
