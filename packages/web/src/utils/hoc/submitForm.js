/* eslint-disable consistent-return */
import { FORM_ERROR } from 'final-form';

const DEFAULT_MESSAGE = 'Submit failed';
const getError = ({ error }) => error;
const getMessage = (error) => error || DEFAULT_MESSAGE;

function isErrorFieldSpecific(error, form) {
	const formKeys = Object.keys(form || {});
	return !Object.keys(error || {}).find((key) => !formKeys.includes(key));
}

function handleParallelPromiseErrors(parallelPromiseOutcomes, values) {
	const errors = Object.values(parallelPromiseOutcomes)
		.filter(getError)
		.map(getError);
	if (errors.length) {
		return errors
			.find((error) => isErrorFieldSpecific(error, values))
			|| errors[0];
	}
}

function formatError(error, values) {
	if (isErrorFieldSpecific(error, values)) {
		return error;
	}
	return { [FORM_ERROR]: getMessage(error) };
}

/**
 * @param {async function}
 * Uses a provided async function
 * to submit a form
 * via React Final Form
 * See: https://final-form.org/docs/react-final-form/types/FormProps#onsubmit
 */
export function submitForm(asyncFunction) {
	return async function submitToFinalForm(values) {
		try {
			const { error, response, ...rest } = await asyncFunction(values);
			if (rest[0]) {
				const submitError = handleParallelPromiseErrors(rest, values);
				return formatError(submitError, values);
			}
			if (response) {
				return;
			}
			return formatError(error, values);
		} catch (error) {
			return { [FORM_ERROR]: getMessage(error) };
		}
	};
}
