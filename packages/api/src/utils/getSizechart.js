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
	// prob need to add recursion here
	// ie wrap this in formatSizechart()
	return {
		id,
		name,
		garmentTypes: Object.values(fits.reduce(reduceFitsToMap, EMPTY_OBJECT)),
	};
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











// TEST CODE

let brand_id = '';

function createOrTest() {
	if (brand_id) {
		return testItOut();
	}
	return Brand.findAll().then((brands) => {
		if (brands[0]) {
			brand_id = brands[0].id;
			return createOrTest();
		}
		return generateData()
			.then((brandId) => {
				brand_id = brandId;
				return createOrTest();
			});
	});
}

async function testItOut() {
	const sizechart = await getSizechart({
		id: brand_id,
		type: 'brand',
	});
	console.log(
		JSON.stringify(
			sizechart,
			null,
			2,
		),
	);
}

async function generateData() {
	console.log('Generating data...');

	try {
		const gt = new GarmentType({ name: 'Shirt' });
		const garmentType = await gt.save();
		const garmentSegment = await garmentType.createGarmentSegment({ name: 'Bottom hip diameter' });

		const brand = await new Brand({ name: 'My brand' }).save();

		const line = await brand.createLine({ name: 'My original Line' });
		const line2 = await brand.createLine({ name: 'My new Line' });

		const collection = await line.createCollection({ name: 'Mens' });
		const collection2 = await line.createCollection({ name: 'Womens' });
		const collection3 = await line2.createCollection({ name: 'Mens' });
		await collection.addGarmentType(garmentType.id);
		await collection2.addGarmentType(garmentType.id);
		await collection3.addGarmentType(garmentType.id);

		const fit = await collection.createFit({ name: 'Standard fit' });
		const fit2 = await collection2.createFit({ name: 'Petites' });
		const fit3 = await collection3.createFit({ name: 'Standard fit' });
		await fit.setGarmentType(garmentType.id);
		await fit2.setGarmentType(garmentType.id);
		await fit3.setGarmentType(garmentType.id);

		const size = await fit.createSize({ name: 'Large' });
		const size2 = await fit2.createSize({ name: 'Extra small' });
		const size3 = await fit3.createSize({ name: 'Medium' });

		const measurement = await size.createMeasurement({ name: 'Hip width' });
		await measurement.setGarmentSegment(garmentSegment.id);

		console.log(
			'\n\n',
			'brandId',
			brand.id,
			'\n\n',
		);
		return brand.id;
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}

}

setTimeout(createOrTest, 2500);
