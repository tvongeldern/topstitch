export function validatePassword(value = '') {
	if (value.length < 8) {
		return 'Password must be at least 8 characters';
	}
}
