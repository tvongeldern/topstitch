export function validateConfirmPassword(value, { password }) {
	if (password && value !== password) {
		return 'Does not match password';
	}
}
