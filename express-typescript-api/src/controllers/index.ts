import config from 'config';
import { Request, Response } from 'express';

/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response) => {
	res.json({
		message: `Service ${config.get('serviceName')} is running`,
		status: 200
	});
};
