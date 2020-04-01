import { join } from 'path';
import {
	mkdirSync,
	readdirSync,
	readFileSync,
	writeFileSync,
} from 'fs';
import pluralize from 'pluralize';
import { titleCase } from 'title-case';

const PROJECT_ROOT = __dirname;

const DEV_DIR = join(PROJECT_ROOT, 'dev');
const TEMPLATES_DIR = join(DEV_DIR, 'templates');
const MODEL_TEMPLATE = join(TEMPLATES_DIR, 'model.hbs');
const MIGRATION_TEMPLATE = join(TEMPLATES_DIR, 'migration.hbs');
const NEW_MODEL_MIGRATION_TEMPLATE = join(TEMPLATES_DIR, 'new-model-migration.hbs');

const SRC_DIR = join(PROJECT_ROOT, 'src');
const MODELS_DIR = join(SRC_DIR, 'models');
const MIGRATIONS_DIR = join(SRC_DIR, 'db', 'migrations');

function pad(num, size) {
	var s = num + "";
	while (s.length < size) s = "0" + s;
	return s;
}

function getTimeStamp() {
	const date = new Date();
	return `
		${date.getUTCFullYear()}
		${pad(date.getUTCMonth() + 1, 2)}
		${pad(date.getUTCDate(), 2)}
		${pad(date.getUTCHours(), 2)}
		${pad(date.getUTCMinutes(), 2)}
		${pad(date.getUTCSeconds(), 2)}
	`.replace(/[^0-9]/g, '');
}

function jsClassName(text) {
	return titleCase(
		pluralize(
			text,
			1
		),
	);
}

function schemaName(text) {
	return pluralize(text, 1).toLowerCase();
}

function tableName(text) {
	return pluralize(text, 2).toLowerCase();
}

function updateIndexFile(getIndexFileLocation, generateNewTextFromUserInput) {
	return function updateFile(...userInputs) {
		const indexFileLocation = getIndexFileLocation(...userInputs);
		const initialText = readFileSync(indexFileLocation).toString();
		const newText = generateNewTextFromUserInput(...userInputs);
		const updatedText = [initialText, newText]
			.join('\n\n')
			.replace(/\n{3,}/g, '\n\n');
		writeFileSync(indexFileLocation, updatedText);
	};
}

function addDirectory(getPathFromInputs) {
	return function add(...userInputs) {
		const path = getPathFromInputs(...userInputs);
		mkdirSync(path);
	};
}

function listSubdirectories(directory) {
	return readdirSync(directory)
		.filter((filename) => !filename.includes('.'));
}

export default function definePlopGenerators({ getHelper, setGenerator, setHelper }) {
	setHelper('jsClassName', jsClassName);
	setHelper('schemaName', schemaName);
	setHelper('tableName', tableName);

	setGenerator('model', {
		description: 'Generate a Sequelize model and migration to create the corresponding Postgres table',
		prompts: [
			{
				name: 'name',
				message: 'What would you like to name your model?',
				type: 'input',
			},
		],
		actions: [
			{
				type: 'add',
				path: `${MODELS_DIR}/{{jsClassName name}}.js`,
				templateFile: MODEL_TEMPLATE,
			},
			updateIndexFile(
				() => `${MODELS_DIR}/index.js`,
				({ name }) => `export { ${jsClassName(name)} } from './${jsClassName(name)}';`,
			),
			{
				type: 'add',
				path: `${MIGRATIONS_DIR}/${getTimeStamp()}-create-{{tableName name}}.js`,
				templateFile: NEW_MODEL_MIGRATION_TEMPLATE,
			},
		],
	});

	setGenerator('migration', {
		description: 'Generate a migration in Sequelize',
		prompts: [
			{
				name: 'name',
				message: 'What would you like to name your migration?',
				type: 'input',
			},
		],
		actions: [
			{
				type: 'add',
				path: `${MIGRATIONS_DIR}/${getTimeStamp()}-{{lowerCase name}}.js`,
				templateFile: MIGRATION_TEMPLATE,
			},
		],
	});
}
