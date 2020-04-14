
//		|\
//		|	\
// b  |  \ c
//    |___\
//			a

function isNumber(value) {
	return typeof value === 'number' && value === value;
}

function options(...opts) {
	return opts.find(isNumber);
}

export function pythagoreanTheoremSolver({
	a, b, c,
}) {
	const lengths = {
		a: options(a, Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2))),
		b: options(b, Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2))),
		c: options(c, Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))),
	};
	return lengths;
}
