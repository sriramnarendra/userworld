'use strict';

const heartbeat = (req, res) => {
    const response = {
        message: 'My Heart is Beating'
    }
    res.send(response);
}

module.exports = {
    heartbeat
};