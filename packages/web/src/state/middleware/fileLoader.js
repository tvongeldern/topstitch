import { FileLoader } from '@utils/clients';

function provideContextToFileLoader({ types, ...action }, dispatch) {
	// File uploads have 4 action types
	const [START, PROGRESS, SUCCESS, ERROR] = types;
	function uploadSingleFile(url, file) {
		const filename = file.name;
		// We make a hash of the file name so that individual uploads
		// can be distinguished from each other before the uploads are complete
		// Setting up progress actions for dispatch
		function onUploadProgress({ loaded, total } = {}) {
			dispatch({
				...action,
				progress: {
					filename,
					loaded,
					total,
					ratio: loaded / total,
				},
				filename,
				type: PROGRESS,
			});
		}
		// First action we dispatch is the START action
		dispatch({ ...action, type: START });
		// We pass the PROGRESS actions as onUploadProgress
		return FileLoader.upload(url, file, onUploadProgress)
			.then((response) => dispatch({
				...action,
				response,
				filename,
				type: SUCCESS,
			}))
			.catch((error) => dispatch({
				...action,
				error,
				filename,
				type: ERROR,
			}));
	}
	function upload(url, files) {
		// Attachment is broken down into individual files
		// so that we can have a separate upload for each one
		const filesArray = Object.values(files);
		return Promise.all(
			filesArray
				.map((file) => uploadSingleFile(url, file)),
		);
	}
	return {
		download: FileLoader.download,
		upload,
	};
}

/*
* Redux middleware to actions
* that have progress updates
*/
export function fileLoader() {
	// Object provided to async action creators
	return function onStoreInitialize() {
		return function onReducerInitialize(next) {
			// FileLoader is initialized on recuer initialization
			// then provided with update action each time it is dispatched
			return function onActionDispatch(action) {
				const {
					process,
					...rest
				} = action;
				// Dispatch standard action objects as-is
				if (!process) {
					return next(action);
				}
				const providedObject = {
					file: provideContextToFileLoader(rest, next),
				};
				return process(providedObject);
			};
		};
	};
}
