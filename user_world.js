'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var filterBasePath = require('./api/swagger/swagger-filter-basepath');

const core = require('./src/core');
const logger  = core.logger;

require('dotenv').config();

var config = {
  appRoot: __dirname // required config
};

var port = process.env.PORT || 10010;
const baseURL = `${process.env.BASE_URL}`;
//app.use(filterBasePath(baseURL));

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
  //swaggerExpress.runner.swagger.basePath = `${process.env.BASE_URL}`;
  // install middleware
  swaggerExpress.register(app);

/*
  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Narendra');
  }
  */
});

const handler = app.listen(port, () => {
	logger.info(`User World Server is listening on the port: ${port}`);
});

module.exports = {
	start: () => app,
	stop: () => {
		handler.close();
	}
};
