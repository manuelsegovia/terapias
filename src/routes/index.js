const terapiaRoute = require('./terapiaRoute');
const utilityRoutes = require('./utilityRoutes');

module.exports = [
  {
    method: 'GET',
    path: '/',
    options: {
      auth: {
        strategy: 'session',
        mode: 'optional',
      },
      description: 'home main route',
    },
    handler: async (request, h) => {
      // console.log('Main Route', request.auth);
      const msg = request.auth.isAuthenticated
        ? `${request.auth.credentials.account.displayName} va a recibir terapia`
        : `fuera de terapias`;
      const { isAuthenticated } = request.auth;
      // console.log(isAuthenticated);
      return h.view('index', { msg, isAuthenticated });
    },
  },
  ...terapiaRoute,
  ...utilityRoutes,
];
