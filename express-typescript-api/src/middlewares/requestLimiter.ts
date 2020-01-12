import express from 'express';
import { RateLimiterMemory, RLWrapperBlackAndWhite } from 'rate-limiter-flexible';

// IP black list
const IP_BLACKLIST: string[] = [];
IP_BLACKLIST.length > 0 && logger.info('IP blacklist ' + JSON.stringify(IP_BLACKLIST));

// wrapped rate limiter instance
const rateLimiter = new RLWrapperBlackAndWhite({
	limiter: new RateLimiterMemory({
		keyPrefix: 'middleware',
		// points: 300, // 300 requests
		// duration: 60, // per 1 minutes by IP
		blockDuration: 60 * 60 * 24, // block for 1 day
	}),
	blackList: IP_BLACKLIST,
	runActionAnyway: false,
});

/**
 * Limits repeating requests by ip
 * @param {*} req express request object
 * @param {*} res express response object
 * @param {*} next express next object
 * @param {*} rateLimiter rate-limiter-flexible instance
 */
export function requestLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
	const forwarded: string = req.headers['x-forwarded-for'] as string;
	const ip: string = forwarded
		? forwarded.split(/, /)[0]
		: req.connection.remoteAddress;

	rateLimiter.consume(ip)
		.then(() => next())
		.catch((err: any) => {
			err.status = 429;
			err.message = `Request rejected: ${ip}`;

			next(err);
		});
}


export default requestLimiter;
