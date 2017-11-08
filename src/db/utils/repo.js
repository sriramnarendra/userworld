'use strict';

const q = require('q');
const core = require('../../core');
const logger = core.logger;
const models = require('../models');
const User = models.User;

const qryStartTime = new Date().getTime();

function createUsers(users) {
    const deferred = q.defer();
    User.insertMany(users, (error, result) => {
        if (error) {
            logger.error(`Error while Creating User: ${error}`);
            deferred.reject(error);
        }
        else {
            logger.info('User is created Successfully');
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}

function signupUser(user) {
    const deferred = q.defer();
    User.create(user, (error, result) => {
        if (error) {
            logger.error(`Error while Creating User: ${error}`);
            deferred.reject(error);
        }
        else {
            logger.info('User is created Successfully');
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}

/*
function getUserInfo {
    const deferred = q.defer();
    User.create(user, (error, result) => {
        if (error) {
            logger.error(`Error while Creating User: ${error}`);
            deferred.reject(error);
        }
        else {
            logger.info('User is created Successfully');
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}
*/
module.exports = {
    createUsers,
    signupUser
    //getUserInfo
}   