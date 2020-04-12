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
	attributes: ['average', 'id', 'min', 'max'],
	include: [
		{
			model: GarmentSegment,
			attributes: ['id', 'name', 'slug'],
		},
	],
};

const garmentType = {
	model: GarmentType,
	attributes: ['id', 'name', 'slug'],
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
	const { id } = garmentType || {};
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


// const asyncPause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// const now = Date.now();

// async function test() {
// 	await asyncPause(1000);
// 	console.log('Starting...');
// 	const shirt = await new GarmentType({
// 		name: `Shirt`,
// 		slug: `shirt`,
// 	}).save();
// 	const hip = await shirt.createGarmentSegment({
// 		name: 'Hip',
// 		slug: 'hip',
// 	});
// 	const brand = await new Brand({
// 		name: `Brand ${now}`,
// 		slug: `brand-${now}`,
// 	}).save();
// 	const line = await brand.createLine({
// 		name: 'Line',
// 		slug: 'line',
// 	});
	
// 	const collection = await line.createCollection({
// 		name: 'Collection',
// 		slug: 'collection',
// 	});
// 	await collection.addGarmentType(shirt.id);
// 	const fit = await collection.createFit({
// 		name: 'Fit',
// 		slug: 'fit',
// 	});
// 	await fit.setGarmentType(shirt.id);
// 	const medium = await fit.createSize({
// 		name: 'Medium',
// 		slug: 'm',
// 	});
// 	const measurement = await medium.createMeasurement({
// 		max: 42,
// 		min: 40,
// 	});
// 	await measurement.setGarmentSegment(hip.id);
// 	// const measurement2 = await medium.createMeasurement({
// 	// 	max: 48,
// 	// 	min: 46,
// 	// });
// 	// await measurement2.setGarmentSegment(hip.id);
// 	const sizechart = await getSizechart({
// 		type: 'fit',
// 		id: fit.id,
// 	});
// 	console.log(
// 		JSON.stringify(
// 			sizechart,
// 			null,
// 			2,
// 		),
// 	);
// }

// test();