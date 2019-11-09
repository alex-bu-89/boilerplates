import config from 'config';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

// Import controllers (route handlers)
import * as indexController from './controllers/';
import * as healthController from './controllers/health';

// Import services
import errorHandler from './middlewares/error';

// Import middlelayers
import logger from './services/logger';

// Create Express server
const app = express();

// DB Connection
mongoose
	.connect(
		`${config.get('db.host')}/${config.get('db.name')}`,
		{ useNewUrlParser: true, useUnifiedTopology: true }
	).catch((error) => { logger.error(error); });

mongoose.connection.on('error', (error) => {
	logger.error(error);
});

// Express configuration
app.set('port', config.get('port'));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Primary app routes.
app.get(`/`, indexController.index);
app.get(`/health`, healthController.index);

// Error handling
app.use(errorHandler);

export default app;
