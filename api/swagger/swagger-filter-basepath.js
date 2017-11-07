'user strict'

const core = require('../../src/core');
const logger = core.logger;

module.exports = function(basePath) {
	const filterBasePath = (req, res, next) => {
		const bp = basePath || '/';
		const validPath = req.url.indexOf(bp) >= 0;
		
		if(!validPath) {
			res.status(404);
			return res.send(`Unable to find ${req.ur}`);
		}
		next();
	}

	return filterBasePath;
}
