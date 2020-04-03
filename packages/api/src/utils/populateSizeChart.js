import * as models from '@models';
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

function formatSizechart(record = {}) {
	return record;
}

export async function populateSizeChart({
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

const brand_id = '';
const line_1_id = '';
const line_2_id = '';
const collection_id = '';
const collection_2_id = '';

async function testItOut() {
	const sizechart = await populateSizeChart({
		id: line_2_id,
		type: 'line',
	});
	console.log(
		JSON.stringify(
			sizechart,
			null,
			2,
		),
	);
}

setTimeout(testItOut, 1500);
