import { getSizechart } from '@utils';

export async function sizechartGetter({ params: { type, id } }, response, next) {
	try {
		const sizechart = await getSizechart({ type, id });
		return response.send(sizechart);
	} catch (error) {
		const { message } = error;
		return next({ status: 400, error, message });
	}
}
