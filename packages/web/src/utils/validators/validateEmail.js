import { EMAIL_PATTERN } from '@constants';

export function validateEmail(value = '') {
	if (!EMAIL_PATTERN.test(value)) {
		return 'Invalid email';
	}
}
