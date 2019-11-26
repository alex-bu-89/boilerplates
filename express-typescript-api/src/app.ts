import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';

// Import controllers (route handlers)
import apiRoutes from './routes/api';

// Import controllers (route handlers)
import * as indexController from './controllers/';
import * as healthController from './controllers/health';

// Import services
import errorHandler from './middlewares/error';

// Import middlelayers
import logger from './services/logger';

// Init express
const app = express();
const router = express.Router();

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

// API routes
router.get('/', indexController.index);
router.get('/health', healthController.index);
router.use('/api/v1', apiRoutes);

app.use('/', router);
app.use(errorHandler);

export default app;
