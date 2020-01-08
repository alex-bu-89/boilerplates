import {
	RateLimiterMemory,
	RLWrapperBlackAndWhite,
} from 'rate-limiter-flexible';
import logger from '../services/logger';

// blocked IPs
const IP_BLACKLIST = [
	'148.251.191.186', // wintopia-mail.de
];

// add ips to black list from env variable
process.env.hasOwnProperty('IP_BLACKLIST') &&
	process.env.IP_BLACKLIST.split(',').forEach(ip => IP_BLACKLIST.push(ip));

// wrapped rate limiter instance
const rateLimiter = new RLWrapperBlackAndWhite({
	limiter: new RateLimiterMemory({
		keyPrefix: 'middleware',
		blockDuration: 60 * 60 * 24,
	}),
	blackList: IP_BLACKLIST,
	runActionAnyway: false,
});

/**
 * Blocked request with ip's from black list
 * @param {*} req express request object
 * @param {*} res express response object
 * @param {*} next express next object
 */
export function ipBlackListMiddleware(req, res, next) {
	const forwarded = req.headers['x-forwarded-for'];
	const ip = forwarded
		? forwarded.split(/, /)[0]
		: req.connection.remoteAddress;

	rateLimiter
		.consume(ip)
		.then(() => {
			next();
		})
		.catch(err => {
			const status = 403;
			const message = 'IP address rejected';

			err.message = message;
			err.status = status;

			next(err);
		});
}

IP_BLACKLIST.length > 0 && logger.info('IP blacklist ' + JSON.stringify(IP_BLACKLIST));
export default ipBlackListMiddleware;
