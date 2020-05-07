import {
	HTTP_WWW_PATTERN,
	NON_ALPHANUMERIC_GLOBAL_PATTERN,
} from '@constants';

const types = {
	start: 'topstitch.brands.createBrand.start',
	success: 'topstitch.brands.createBrand.success',
	fail: 'topstitch.brands.createBrand.fail',
};

export const createBrandReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, { response }) => ({
		...state,
		brands: {
			...state.brands,
			[response.id]: response,
		},
		created: response.slug,
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

function filterUrlJunk(segment) {
	return !HTTP_WWW_PATTERN.test(segment);
}

function slugFromName(name) {
	return name
		.split(' ')[0]
		.toLowerCase()
		.replace(NON_ALPHANUMERIC_GLOBAL_PATTERN, '');
}

function generateSlug({ name, website }) {
	const [
		slugFromWebsite = slugFromName(name),
	] = website.split('.').filter(filterUrlJunk);
	return slugFromWebsite;
}

export const createBrand = ({
	name,
	website = '',
	slug = generateSlug({ name, website }),
}) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.post(
		'/brands/',
		{ name, slug, website },
	),
});
