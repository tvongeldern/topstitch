import { db } from '@db';
import {
	id,
	name,
} from './_fields';

export const SavedSize = db.define('savedSize', { id, name });
