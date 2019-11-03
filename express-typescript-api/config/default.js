module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    serviceName: 'express-typescript-boilerplate',
    logger: {
        level: process.env.LOG_LEVEL || 'trace',
    },
    db: {
        host: process.env.MONGODB_HOST || 'mongodb://localhost:27017',
        name: process.env.MONGODB_DBNAME || 'mydb',
    }
}