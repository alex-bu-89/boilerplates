import express from 'express';
import logger from '../utils/logger';

export function errorHandler(
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    if (res.headersSent) {
        return next(err);
    }

    logger.error(err.message, JSON.stringify(err.stack), JSON.stringify(req.header), JSON.stringify(req.body));

    res.status(500);
    res.render('error', { error: err.stack });
}

export default errorHandler;
