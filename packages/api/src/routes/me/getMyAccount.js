export async function getMyAccount({ me }, response, errorHandler) {
	try {
		return response.send(me);
	} catch (error) {
		return errorHandler({ error });
	}
}
