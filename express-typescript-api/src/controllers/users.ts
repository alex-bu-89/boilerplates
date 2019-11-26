import { Request, Response } from 'express';
import config from 'config';

/**
 * GET /
 * Index route
 */
export function getAll(req: Request, res: Response) {
	console.log('------');
	res.json([{id: 0, email: 'foo@bar.com', name: 'Baz'}]);
}

export default {
	getAll
};
