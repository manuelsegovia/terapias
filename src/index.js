const dotenv = require('dotenv');
const app = require('./app');

const init = async () => {
  dotenv.config();
  const server = await app.createServer();
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
