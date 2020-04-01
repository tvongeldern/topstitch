import mung from 'express-mung';

/**
 * Response data is sent in the body.data object,
 * a metadata object is also included.
 * 
 * Metadata can be accessed/updated in the request handlers
 * using the `response.metadata` object
 */
function formatResponseObject(data, request, response) {
	const { metadata = {} } = response;
	return { data, metadata };
}

export const responseStructure = mung.json(formatResponseObject);
