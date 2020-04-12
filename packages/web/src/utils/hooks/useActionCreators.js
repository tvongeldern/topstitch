import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

function Binder(dispatch) {
	return function bindToDispatch(action) {
		return bindActionCreators(action, dispatch);
	}
}

/**
 * Maps action creators to dispatch
 */
export function useActionCreators(...actionCreators) {
	const dispatch = useDispatch();
	const bindToDispatch = Binder(dispatch);
	return actionCreators.map(bindToDispatch);
}
