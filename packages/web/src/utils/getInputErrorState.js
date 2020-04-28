export function getInputErrorState(
	errors,
	{
		touched,
		submitFailed,
	}) {
	switch (errors) {
		case 'show':
			return touched;
		case 'hide':
			return false;
		case 'submit':
			return submitFailed;
		default:
			return false;
	}
}
