const Bell = require('@hapi/bell');
const authCookie = require('@hapi/cookie');

const isSecure = process.env.NODE_ENV === 'production';

exports.plugin = {
  name: 'authPlugin',
  version: '1.0.0',
  register: async (server, options) => {
    const location = isSecure
      ? 'https://terapiasmibuen.herokuapp.com'
      : server.info.uri;
    await server.register([authCookie, Bell]);
    server.auth.strategy('session', 'cookie', {
      cookie: {
        name: 'sid-google',
        path: '/',
        password: 'password-should-be-32-characters',
        isSecure,
      },
      redirectTo: '/bell/door',
    });
    // Google bell
    server.auth.strategy('google', 'bell', {
      provider: 'google',
      password: 'cookie_encryption_password_secure',
      isSecure,
      clientId: process.env.G_CLIENT,
      clientSecret: process.env.G_SECRET,
      forceHttps: false,
      location,
    });
    server.auth.default('session');
    server.route({
      method: ['GET', 'POST'],
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
