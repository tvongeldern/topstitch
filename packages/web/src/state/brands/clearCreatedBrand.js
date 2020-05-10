const type = 'topstitch.brands.clearCreatedBrand.start';

export const clearCreatedBrandReducer = {
	[type]: ({ created, ...state }) => state,
};

export const clearCreatedBrand = () => ({ type });
