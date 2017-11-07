'use strict';

const winston = require('winston');
const dateFormat = require('date-format');

let options;

if (process.env.LOG_TO_CONSOLE === 'true') {
    options = {
        rewriters: [],
        transports: [
            new winston.transports.Console({
                level: 'silly',
                timestamp: () => dateFormat('MM/dd/yy hh:mm:ss', new Date())
            })
        ]
    }

}
else {
    options = {
        rewriters: [],
        transports: [
            new winston.transports.File({
                level: 'silly',
                timestamp: () => dateFormat('MM/dd/yy hh:mm:ss', new Date()),
                filename: 'app.log',
                maxsize: '10485760',
                maxFiles: 2,
                tailable: true
            })
        ]
    }

}

module.exports = new winston.Logger(options);
