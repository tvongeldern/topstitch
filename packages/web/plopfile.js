import {
	mkdirSync,
	readdirSync,
	readFileSync,
	writeFileSync,
} from 'fs';

const PROJECT_ROOT = '.';
const TEMPLATES_DIR = `${PROJECT_ROOT}/templates`;
const SOURCE_DIR = `${PROJECT_ROOT}/src`;
const COMPONENTS_DIR = `${SOURCE_DIR}/components`;
const FORMS_DIR = `${SOURCE_DIR}/forms`;
const STATE_DIR = `${SOURCE_DIR}/state`;
const ACTIONS_DIR = `${STATE_DIR}/actions`;
const REDUCERS_DIR = `${STATE_DIR}/reducers`;
const PAGES_DIR = `${PROJECT_ROOT}/pages`;
const SCSS_TEMPLATE = '.container {\n\n}';

function updateIndexFile(getIndexFileLocation, generateNewTextFromUserInput) {
	return function updateFile(...userInputs) {
		const indexFileLocation = getIndexFileLocation(...userInputs);
		const initialText = readFileSync(indexFileLocation).toString();
		const rows = initialText.split(';').map((row) => row.trim());
		rows.push(generateNewTextFromUserInput(...userInputs));
		const newIndexText = rows.filter((r) => r).sort().join(';\n');
		writeFileSync(indexFileLocation, `${newIndexText};\n`);
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

export default function definePlopGenerators({ setGenerator }) {
	setGenerator('component', {
		description: 'Generate a React component',
		prompts: [
			{
				name: 'location',
				message: 'To which components directory would you like to add?',
				type: 'list',
				choices: listSubdirectories(COMPONENTS_DIR),
			},
			{
				name: 'name',
				message: 'What would you like to name your component?',
				type: 'input',
			},
		],
		actions: [
			addDirectory(
				({ location, name }) => `${COMPONENTS_DIR}/${location}/${name}`,
			),
			{
				type: 'add',
				path: `${COMPONENTS_DIR}/{{location}}/{{name}}/styles.scss`,
				template: SCSS_TEMPLATE,
			},
			{
				type: 'add',
				path: `${COMPONENTS_DIR}/{{location}}/{{name}}/index.js`,
				templateFile: `${TEMPLATES_DIR}/ReactComponent.hbs`,
			},
			updateIndexFile(
				({ location }) => `${COMPONENTS_DIR}/${location}/index.js`,
				({ name }) => `export { default as ${name} } from './${name}'`,
			),
		],
	});

	setGenerator('form', {
		description: 'Generate a React form component',
		prompts: [
			{
				name: 'name',
				message: 'What would you like to name your form?',
				type: 'input',
			},
		],
		actions: [
			addDirectory(
				({ name }) => `${FORMS_DIR}/${name}`,
			),
			{
				type: 'add',
				path: `${FORMS_DIR}/{{name}}/styles.scss`,
				template: SCSS_TEMPLATE,
			},
			{
				type: 'add',
				path: `${FORMS_DIR}/{{name}}/index.js`,
				templateFile: `${TEMPLATES_DIR}/ReactFormComponent.hbs`,
			},
			updateIndexFile(
				() => `${FORMS_DIR}/index.js`,
				({ name }) => `export { default as ${name} } from './${name}'`,
			),
		],
	});

	setGenerator('page', {
		description: 'Generate a React container in the pages directory',
		prompts: [
			{
				name: 'route',
				message: 'What would you like to name your route?',
				type: 'input',
			},
			{
				name: 'component',
				message: 'What would you like to name your component?',
				type: 'input',
			},
		],
		actions: [
			{
				type: 'add',
				path: `${PAGES_DIR}/{{route}}.js`,
				templateFile: `${TEMPLATES_DIR}/ReactContainer.hbs`,
			},
		],
	});

	setGenerator('action', {
		description: 'Generate a Redux action creator',
		prompts: [
			{
				name: 'location',
				message: 'To which reducer does this action apply?',
				type: 'list',
				choices: listSubdirectories(ACTIONS_DIR),
			},
			{
				name: 'name',
				message: 'What would you like to name your action creator?',
				type: 'input',
			},
			{
				name: 'type',
				message: 'What would you like to name your action creator?',
				type: 'list',
				choices: [
					'async',
					'sync',
					'process',
				],
			},
		],
		actions: [
			{
				type: 'add',
				path: `${ACTIONS_DIR}/{{location}}/creators/{{name}}.js`,
				templateFile: `${TEMPLATES_DIR}/ActionCreator-{{type}}.hbs`,
			},
			updateIndexFile(
				({ location }) => `${ACTIONS_DIR}/${location}/index.js`,
				({ name }) => `export { creator as ${name} } from './creators/${name}'`,
			),
			updateIndexFile(
				({ location }) => `${ACTIONS_DIR}/${location}/reducers.js`,
				({ name }) => `export { reducer as ${name} } from './creators/${name}'`,
			),
		],
	});

	setGenerator('reducer', {
		description: 'Generate a new Redux reducer',
		prompts: [
			{
				name: 'name',
				message: 'What would you like to name this reducer?',
				type: 'input',
			},
		],
		actions: [
			{
				type: 'add',
				path: `${REDUCERS_DIR}/{{name}}.js`,
				templateFile: `${TEMPLATES_DIR}/Reducer.hbs`,
			},
			addDirectory(
				({ name }) => `${ACTIONS_DIR}/${name}`,
			),
			addDirectory(
				({ name }) => `${ACTIONS_DIR}/${name}/creators`,
			),
			{
				type: 'add',
				path: `${ACTIONS_DIR}/{{name}}/index.js`,
				template: '',
			},
			{
				type: 'add',
				path: `${ACTIONS_DIR}/{{name}}/reducers.js`,
				template: '',
			},
			updateIndexFile(
				() => `${REDUCERS_DIR}/index.js`,
				({ name }) => `export { default as ${name} } from './${name}'`,
			),
			updateIndexFile(
				() => `${ACTIONS_DIR}/index.js`,
				({ name }) => `export * from './${name}'`,
			),
		],
	});
}
