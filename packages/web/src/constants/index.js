export { default as config } from './config';

export const AUTH_COOKIE_PATTERN = /^CognitoIdentityServiceProvider\.[a-z0-9]{20,30}\.[^\s]+?@[^\s]+?\.[^\s]+?\.idToken$/;

export const EMPTY_ARRAY = Object.freeze([]);

export const EMPTY_OBJECT = Object.freeze({});

export const MAGIC_RATIO = 1.6180339887;

export const EMAIL_PATTERN = /^[^@]+@[^@.]+.[^@.]+$/;
