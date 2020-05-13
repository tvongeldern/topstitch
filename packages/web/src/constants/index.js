export { default as config } from './config';

export const EMPTY_ARRAY = Object.freeze([]);

export const EMPTY_OBJECT = Object.freeze({});

export const MAGIC_RATIO = 1.6180339887;

/**
 * PATTERNS
 */

export const AUTH_COOKIE_PATTERN = /^CognitoIdentityServiceProvider\.[a-z0-9]{20,30}\.[^\s]+?@[^\s]+?\.[^\s]+?\.idToken$/;

export const EMAIL_PATTERN = /^[^@]+@[^@.]+.[^@.]+$/;

export const NON_ALPHANUMERIC_GLOBAL_PATTERN = /[^a-z0-9]/g;

export const NON_NUMERIC_GLOBAL_PATTERN = /[^0-9]/g;

/**
 * Measurement Units
 */

export const CM = 'centimeters';

export const INCHES = 'inches';

export const UNITS = [INCHES, CM];

export const DEFAULT_UNITS = INCHES;

export const MM_IN_AN_INCH = 25.4;

export const MM_IN_A_CM = 10;

export const UNITS_FACTORS_MAP = {
	[INCHES]: MM_IN_AN_INCH,
	[CM]: MM_IN_A_CM,
};
