module.exports = [
  {
    method: 'GET',
    path: '/{param*}',
    options: {
      auth: false,
    },

    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true,
      },
    },
  },
];
