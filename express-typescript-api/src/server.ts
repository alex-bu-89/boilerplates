import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { ApolloServer, gql } from 'apollo-server-express';

// Import controllers (route handlers)
import indexController  from './controllers/indexController';
import healthController  from './controllers/healthController';
import usersController  from './controllers/usersController';

// Import middlelayers
import errorHandler from './middlewares/errorHandler';

// Import helpers
import logger from './utils/logger';

// Import graphql
import { typeDefs } from './graphql/graphqlSchema';
import { resolvers } from './graphql/resolvers';

// Init express
const app = express();
const router = express.Router();

// Mongodb connection
mongoose.connect(
	`${config.get('db.host')}/${config.get('db.name')}`,
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.on('error', (error: any) => {
	logger.error(error);
});

// Express configuration
app.set('port', config.get('port'));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Graphql server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
server.applyMiddleware({ app });
logger.info(`Graphql path: ${server.graphqlPath}`);

// REST andpoints
router.get('/', indexController.index);
router.get('/health', healthController.index);
router.get('/users', usersController.getAll);
app.use('/v1', router);

// Error handling
app.use(errorHandler);

export default app;
