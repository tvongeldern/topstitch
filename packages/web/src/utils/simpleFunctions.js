export const IS_TRUTHY = (v) => v;

export const IS_FALSEY = (v) => !v;

export const NEAREST_EVEN = (n) => 2 * Math.round(n / 2);

export const ADD_ABS = (...args) => args.reduce((sum, num) => sum + Math.abs(num), 0);
