import winston from 'winston';
import config from './../../config/config.js';

const environment = config.nodeEnv;
let logger;


const customLevelOptions = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5
    },
    colors: {
        'error': 'red',
        'warn': 'yellow',
        'info': 'green',
        'http': 'cyan',
        'verbose': 'magenta',
        'debug': 'blue'
    }
}

if (environment === 'prod') {
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize({
                    all: true,
                    colors: customLevelOptions.colors
                }),
                winston.format.simple()
                )
            }),
            new winston.transports.File({
                filename: 'logs/errors.log',
                level: 'error'
            }),
        ]
    });
} else {
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize({
                        all: true,
                        colors: customLevelOptions.colors
                    }),
                    winston.format.simple()
                )
            })
        ]
    });

}






export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
    next();
}