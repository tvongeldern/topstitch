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

const measurement = {
	model: Measurement,
	attributes: ['average', 'id', 'min', 'max'],
	include: [
		{
			model: Segment,
			attributes: ['id', 'name', 'slug'],
		},
	],
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
	attributes: ['id', 'name'],
	include: [size, garment],
};

const collection = {
	model: Collection,
	attributes: ['id', 'name'],
	include: [fit],
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

function reduceFitsToMap(garments, { garment, ...fit }) {
	const { id } = garment || {};
	const existing = garments[id] || {};
	return {
		...garments,
		[id]: {
			...existing,
			...garment,
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
		garments: Object.values(fits.reduce(reduceFitsToMap, EMPTY_OBJECT)),
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
// 	const shirt = await new Garment({
// 		name: `Shirt ${now}`,
// 		slug: `shirt-${now}`,
// 	}).save();
// 	const hip = await shirt.createSegment({
// 		name: 'Hip',
// 		slug: 'hip',
// 	});
// 	const brand = await new Brand({
// 		name: `Brand ${now}`,
// 		slug: `brand-${now}`,
// 	}).save();
//
// 	const collection = await brand.createCollection({
// 		name: 'Collection',
// 		slug: 'collection',
// 	});
// 	await collection.addGarment(shirt.id);
// 	const fit = await collection.createFit({
// 		name: 'Fit',
// 		slug: 'fit',
// 	});
// 	await fit.setGarment(shirt.id);
// 	const medium = await fit.createSize({
// 		name: 'Medium',
// 		slug: 'm',
// 	});
// 	const measurement = await medium.createMeasurement({
// 		max: 42,
// 		min: 40,
// 	});
// 	await measurement.setSegment(hip.id);
// 	// const measurement2 = await medium.createMeasurement({
// 	// 	max: 48,
// 	// 	min: 46,
// 	// });
// 	// await measurement2.setSegment(hip.id);
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