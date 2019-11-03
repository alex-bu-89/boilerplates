import config from 'config';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import errorHandler from 'errorhandler';
import mongoose from 'mongoose';

// Import controllers (route handlers)
import * as indexController from './controllers/';
import * as healthController from './controllers/health';

// Import services
import logger from './services/logger';

// Create Express server
const app = express();

// Express configuration
app.set('port', config.get('port'));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (config.get('env') !== 'production') {
	app.use(errorHandler()); // Error Handler. Provides full stack
}

// DB Connection
mongoose.connect(
	`${config.get('db.host')}/${config.get('db.name')}`,
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

// Check db connection
// @TODO

// Primary app routes.
app.get(`/`, indexController.index);
app.get(`/health`, healthController.index);

export default app;
