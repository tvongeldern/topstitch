import { Account, Review, Brand } from '@models';
import { getJSON } from '@utils';

const ACCOUNT_NAME = {
	model: Account,
	attributes: ['name'],
};

const FEED_QUERY = {
	order: [['createdAt', 'DESC']],
	limit: 5,
};

const FEED_QUERY_BRANDS = {
	...FEED_QUERY,
	attributes: ['id', 'name', 'slug', 'createdAt'],
	include: [ACCOUNT_NAME],
};

const FEED_QUERY_REVIEWS = {
	...FEED_QUERY,
	attributes: ['id', 'rating', 'review', 'createdAt'],
	include: [
		ACCOUNT_NAME,
		{
			model: Brand,
			attributes: ['name', 'slug'],
		},
	],
};

function sortFeed({ createdAt: a }, { createdAt: b }) {
	return new Date(b) - new Date(a);
}

export async function getFeed(request, response, errorHandler) {
	try {
		const [brands, reviews] = await Promise.all([
			Brand.findAll(FEED_QUERY_BRANDS),
			Review.findAll(FEED_QUERY_REVIEWS),
		]);
		const sorted = [...brands, ...reviews]
			.sort(sortFeed)
			.map(getJSON);
		return response.send(sorted);
	} catch (error) {
		console.log(error);
		return errorHandler({ error });
	}
}
