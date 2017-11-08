'use strict';
const core = require('../../src/core');
const logger = core.logger;

const getInfo = (req, res) => {
    logger.info('Successfully reached GetInfo');
    const userInfo = {
        id: 'sriramnarendra',
        firstName: 'Narendra Babu',
        lastName: 'Sreeram'
    }
    res.json({ 'userInfo': userInfo });
}

const signUp = (req, res) => {
    const response = {
        message: 'User Creation is Successful'
    }
    res.send(response);
}

module.exports = {
    getInfo,
    signUp
}