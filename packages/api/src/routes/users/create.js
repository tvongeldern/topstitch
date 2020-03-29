import { User } from '@models';
import { response } from 'express';

export default function createUser({ body }, response) {
	console.log({ body });
	response.send({ body });
}
