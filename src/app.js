const Hapi = require('@hapi/hapi');
const Path = require('path');

module.exports.createServer = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'assets'),
      },
      cors: true,
    },
  });
  await server.register(require('./plugins'));
  server.views({
    engines: {
      hbs: require('handlebars'),
    },
    relativeTo: __dirname,
    path: 'views',
    isCached: false,
    layout: true,
  });
  server.route(require('./routes'));
  return server;
};
