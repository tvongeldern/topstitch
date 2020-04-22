import { useActionCreators } from './useActionCreators';
import { submitForm } from '../hoc';

export function useSubmit(...actionCreators) {
	return useActionCreators(...actionCreators).map(submitForm);
}