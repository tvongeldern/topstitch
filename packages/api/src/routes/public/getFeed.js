import { Account, Review, Brand } from '@models';
import { getJSON } from '@utils';

const FEED_QUERY = {
	order: [['createdAt', 'DESC']],
	limit: 5,
	// include: ['createdBy']
};

function sortFeed({ createdAt: a }, { createdAt: b }) {
	return a.localeCompare(b);
}

export async function getFeed(request, response, errorHandler) {
	try {
		const [brands, reviews] = await Promise.all([
			Brand.findAll(FEED_QUERY),
			Review.findAll(FEED_QUERY),
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
