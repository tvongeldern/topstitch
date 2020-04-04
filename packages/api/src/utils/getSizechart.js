import * as models from '@models';
import { db } from '@db';
import { getJSON } from './getJSON';

const modelsMap = Object.values(models).reduce((map, model) => ({
	...map,
	[model.name]: model,
}), {});

const attributes = ['id', 'name'];
const INCLUDE_NESTED_ASSOCIATIONS = {
	attributes,
	include: [
		{ all: true, nested: true, attributes },
	]
};

function formatSizechart({ ...record } = {}) {
	return record;
}

export async function getSizechart({
	type,
	id,
}) {
	const model = modelsMap[type];
	if (!model) {
		throw new Error(`Type "${type}" is not valid`);
	}
	try {
		const parent = await model.findByPk(id, INCLUDE_NESTED_ASSOCIATIONS);
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

const brand_id = 'b6fa6aea-5a6b-4a27-b140-1878934ebe9a';
const line_1_id = '';
const line_2_id = '';
const collection_id = '';
const collection_2_id = '';
const fit_id = '';
const fit_2_id = '';
const garment_type_id = '';

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
	const {
		Brand,
		Line,
		Collection,
		GarmentType,
		Fit,
		Size,
		GarmentSegment,
		Measurement,
	} = models;

	const transaction = await db.transaction();

	try {
		const garmentType = await new GarmentType({ name: 'Shirt' }).save();
		console.log(garmentType);
		const garmentSegment = await garmentType.createGarmentSegment({ name: 'Bottom hip diameter'});

		const brand = await new Brand({ name: 'My brand' }).save();
		const line = await brand.createLine({ name: 'My original Line' });
		const line2 = await brand.createLine({ name: 'My new Line' });
		const collection = await line.createCollection({ name: 'Mens' });
		const collection2 = await line.createCollection({ name: 'Womens' });
		const collection3 = await line2.createCollection({ name: 'Mens' });
		const fit = await collection.createFit({ name: 'Standard fit' }).addGarmentType(garmentType);
		const fit2 = await collection2.createFit({ name: 'Petites' });
		const fit3 = await collection2.createFit({ name: 'Standard fit' });
		const size = await fit.createSize({ name: 'Large' });
		const measurement = await size.createMeasurement({ name: 'Hip width' }).addGarmentSegment(garmentSegment);
		console.log({
			brandId: brand.id,
		});
		await transaction.commit();
	} catch (error) {
		console.error(error);
		await transaction.rollback();
	}

}

// setTimeout(generateData, 1500);
// setTimeout(testItOut, 1500);