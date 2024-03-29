import {
	mkdirSync,
	readdirSync,
	readFileSync,
	writeFileSync,
} from 'fs';

const PROJECT_ROOT = __dirname;
const ASSETS_DIR = `${PROJECT_ROOT}/assets`;
const TEMPLATES_DIR = `${PROJECT_ROOT}/dev/templates`;
const SOURCE_DIR = `${PROJECT_ROOT}/src`;
const ICONS_DIR = `${SOURCE_DIR}/icons`;
const COMPONENTS_DIR = `${SOURCE_DIR}/components`;
const FORMS_DIR = `${SOURCE_DIR}/forms`;
const STATE_DIR = `${SOURCE_DIR}/state`;
const PAGES_DIR = `${PROJECT_ROOT}/pages`;

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
				templateFile: `${TEMPLATES_DIR}/SassFile.hbs`,
			},
			{
				type: 'add',
				path: `${COMPONENTS_DIR}/{{location}}/{{name}}/index.js`,
				templateFile: `${TEMPLATES_DIR}/ReactComponent.hbs`,
			},
			updateIndexFile(
				({ location }) => `${COMPONENTS_DIR}/${location}/index.js`,
				({ name }) => `export { ${name} } from './${name}'`,
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
				templateFile: `${TEMPLATES_DIR}/SassFile.hbs`,
			},
			{
				type: 'add',
				path: `${FORMS_DIR}/{{name}}/index.js`,
				templateFile: `${TEMPLATES_DIR}/ReactFormComponent.hbs`,
			},
			updateIndexFile(
				() => `${FORMS_DIR}/index.js`,
				({ name }) => `export { ${name} } from './${name}'`,
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
				choices: listSubdirectories(STATE_DIR).filter((dirName) => dirName !== 'middleware'),
			},
			{
				name: 'name',
				message: 'What would you like to name your action creator?',
				type: 'input',
			},
		],
		actions: [
			{
				type: 'add',
				path: `${STATE_DIR}/{{location}}/{{name}}.js`,
				templateFile: `${TEMPLATES_DIR}/ActionCreator.hbs`,
			},
			updateIndexFile(
				({ location }) => `${STATE_DIR}/${location}/_actionCreators.js`,
				({ name }) => `export { ${name} } from './${name}'`,
			),
			updateIndexFile(
				({ location }) => `${STATE_DIR}/${location}/_reducers.js`,
				({ name }) => `export { ${name}Reducer } from './${name}'`,
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
			addDirectory(
				({ name }) => `${STATE_DIR}/${name}`,
			),
			{
				type: 'add',
				path: `${STATE_DIR}/{{name}}/_actionCreators.js`,
				template: '',
			},
			{
				type: 'add',
				path: `${STATE_DIR}/{{name}}/_reducers.js`,
				template: '',
			},
			{
				type: 'add',
				path: `${STATE_DIR}/{{name}}/index.js`,
				templateFile: `${TEMPLATES_DIR}/Reducer.hbs`,
			},
			updateIndexFile(
				() => `${STATE_DIR}/reducers.js`,
				({ name }) => `export { ${name} } from './${name}'`,
			),
			updateIndexFile(
				() => `${STATE_DIR}/actions.js`,
				({ name }) => `export * from './${name}'`,
			),
		],
	});
}
