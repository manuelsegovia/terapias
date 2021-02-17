module.exports = [
  {
    method: 'GET',
    path: '/misterapias',
    handler: (request, h) => {
      const terapias = require('../assets/terapias');
      return h.view('misterapias', {
        msg: request.auth.credentials.account.displayName,
        isAuthenticated: request.auth.isAuthenticated,
        terapias,
      });
    },
  },
];
