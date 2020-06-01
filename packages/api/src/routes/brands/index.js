import { Router } from 'express';
import { Brand } from '@models';
import { REQUIRE_AUTH } from '@middleware';
import {
	creator,
	destroy,
	search,
} from '@utils/handlers';

const SEARCH_ATTRIBUTES = ['id', 'name', 'slug'];

const brands = new Router();

brands.post('/', REQUIRE_AUTH, creator(Brand));
brands.get('/', search(Brand, SEARCH_ATTRIBUTES))

brands.delete('/:id', REQUIRE_AUTH, destroy(Brand));

brands.post(
	'/:id/collections/',
	REQUIRE_AUTH,
	creator(Brand, 'createCollection'),
);


export default brands;
