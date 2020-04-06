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
		const garmentType = await new GarmentType({ name: 'Shirt' }, { transaction }).save({ transaction });
		// const garmentSegment = await garmentType
		// 	.createGarmentSegment({ name: 'Bottom hip diameter'}, { transaction });

		const brand = await new Brand({ name: 'My brand' }, { transaction }).save({ transaction });
		const line = await brand.createLine({ name: 'My original Line' }, { transaction });
		const line2 = await brand.createLine({ name: 'My new Line' }, { transaction });
		const collection = await line.createCollection({ name: 'Mens' }, { transaction });
		const collection2 = await line.createCollection({ name: 'Womens' }, { transaction });
		const collection3 = await line2.createCollection({ name: 'Mens' }, { transaction });
		await collection.addGarmentType(garmentType.id, { transaction });
		await collection2.addGarmentType(garmentType.id, { transaction });
		await collection3.addGarmentType(garmentType.id, { transaction });
		const fit = await collection.createFit({ name: 'Standard fit' }, { transaction });
		const fit2 = await collection2.createFit({ name: 'Petites' }, { transaction });
		const fit3 = await collection3.createFit({ name: 'Standard fit' }, { transaction });
		await fit.setGarmentType(garmentType.id, { transaction });
		await fit2.setGarmentType(garmentType.id, { transaction });
		await fit3.setGarmentType(garmentType.id, { transaction });
		const size = await fit.createSize({ name: 'Large' }, { transaction });
		const size2 = await fit2.createSize({ name: 'Extra small' }, { transaction });
		const size3 = await fit3.createSize({ name: 'Medium' }, { transaction });
		// const measurement = await size.createMeasurement({ name: 'Hip width' }, { transaction });
		console.log(
			'\n\n',
			'brandId',
			brand.id,
			'\n\n',
		);
		await transaction.commit();
		return brand.id;
	} catch (error) {
		console.error(error);
		await transaction.rollback();
	}

}

const brand_id = '';

setTimeout(brand_id  ? testItOut : generateData, 2500);
