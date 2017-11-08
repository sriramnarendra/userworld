'use strict';

const mongoose = require('mongoose');
const core = require('../core');

const logger = core.logger;
let retries = 0;
let timeout = 1000;

const poolSize = process.env.CONNECTION_POOL;

const mongooseOption = {
    server: { poolSize: poolSize}
}

if (process.env.CONNECTION_POOL === 'prod') { mongooseOption.mongos = true; }

mongoose.Promise = require('q').Promise;

const connectWithRetry = () => {
    return mongoose.connect(process.env.DB_URI, mongooseOption, connectionCallback);
    function connectionCallback(err) {
        if (retries >= 10) {
            logger.error(`error connecting mongo: ${err}, exhausts connection retries`);
        }
        else if(err) {
            logger.error(`error connecting mongo: ${err}, attempting retry`);
            setTimeout(() => {
                connectWithRetry()
                timeout = timeout + 1000;
                retries = retries + 1;
            }, timeout);
        }
        else {
            logger.info('Successfully Connected to DB');
        }
    }
}

connectWithRetry();
module.exports = mongoose;