const Bell = require('@hapi/bell');
const authCookie = require('@hapi/cookie');

exports.plugin = {
  name: 'authPlugin',
  version: '1.0.0',
  register: async (server, options) => {
    await server.register([authCookie, Bell]);
    server.auth.strategy('session', 'cookie', {
      cookie: {
        name: 'sid-google',
        path: '/',
        password: 'password-should-be-32-characters',
        isSecure: false,
      },
      redirectTo: '/bell/door',
    });
    // Google bell
    server.auth.strategy('google', 'bell', {
      provider: 'google',
      password: 'cookie_encryption_password_secure',
      isSecure: false,
      clientId: process.env.G_CLIENT,
      clientSecret: process.env.G_SECRET,
      location: server.info.uri,
    });
    server.auth.default('session');
    server.route({
      method: ['GET'],
      path: '/bell/door',
      options: {
        auth: {
          strategy: 'google',
          mode: 'try',
        },
        handler(request, h) {
          if (!request.auth.isAuthenticated) {
            return `Authentication failed due to: ${request.auth.error.message}`;
          }
          const account = {
            email: request.auth.credentials.profile.email,
            displayName: request.auth.credentials.profile.displayName,
          };
          request.cookieAuth.set({ account });
          return h.redirect('/');
        },
      },
    });
    server.route({
      method: 'GET',
      path: '/logout',
      handler: (request, h) => {
        try {
          if (request.auth.isAuthenticated) {
            // clear the local session
            request.cookieAuth.clear();
          }
          return h.redirect('/');
        } catch (err) {
          console.log(err);
        }
      },
    });
  },
};
