import winston from 'winston';
import config from './../../config/config.js';

const environment = config.nodeEnv;
let logger;

if(environment === 'prod') {
    logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: 'info'
            }),
            new winston.transports.File({
                filename: 'logs/errors.log',
                level: 'error'
            }),
        ]
    });
}else{
    logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: 'debug'
            })
        ]
    });

}




export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
    next();
}