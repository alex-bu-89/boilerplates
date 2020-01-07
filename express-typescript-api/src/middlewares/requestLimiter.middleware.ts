import { RateLimiterMemory } from 'rate-limiter-flexible';

// rate limiter instance for DDos attacks
const rateLimiter = new RateLimiterMemory({
	keyPrefix: 'middleware',
	points: 300, // 300 requests
	duration: 60, // per 1 minutes by IP
	blockDuration: 60 * 60 * 24, // block for 1 day
});

/**
 * Limits repeating requests by ip
 * @param {*} req express request object
 * @param {*} res express response object
 * @param {*} next express next object
 * @param {*} rateLimiter rate-limiter-flexible instance
 */
export function requestLimiter(req: any, res: any, next: any) {
	const forwarded: string = req.headers['x-forwarded-for'];
	const ip: string = forwarded
		? forwarded.split(/, /)[0]
		: req.connection.remoteAddress;

	rateLimiter
		.consume(ip)
		.then(() => {
			next();
		})
		.catch((err: any) => {
			const status = 429;
			const message = 'Too many requests';

			err.message = message;
			err.status = status;

			next(err);
		});
}

export default requestLimiter;
