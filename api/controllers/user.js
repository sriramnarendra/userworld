'use strict';
const core = require('../../src/core');
const logger = core.logger;
const repo = require('../../src/db/utils/repo');
const co = require('co');

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
    const userToCreate = req.body;
    co(function* () {
        try {
            logger.info(`User To Create is: ${userToCreate} and its UserId is: ${userToCreate.id}`);

            userToCreate.createTs = new Date();
            userToCreate.createUserId = req.get('UW-UserId');
            userToCreate.lastChangeTs = new Date();
            userToCreate.lasteChangeUserId = req.get('UW-UserId');

            let result = yield repo.signupUser(userToCreate);
            if (!result) {
                throw new Error('User creation is Failed. ');
            }
            const response = {
                message: 'User Creation is Successful'
            }
            res.send(response);
        }
        catch (err) {
            logger.error(`caught Error: ${err}`);
            res.status(409).send({ 'error': err.message });
        }
    });
    repo.signupUser(userToCreate);

}

module.exports = {
    getInfo,
    signUp
}
