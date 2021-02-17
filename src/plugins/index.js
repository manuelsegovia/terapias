const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const utilityPlugins = require('./utilityPlugins');
const auth = require('./auth');

module.exports = [Inert, Vision, auth, ...utilityPlugins];
