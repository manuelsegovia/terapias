module.exports = [
  {
    plugin: require('blipp'),
    options: {
      showAuth: true,
    },
  },
  {
    plugin: require('laabr'),
    options: {
      formats: { onPostStart: ':time :start :level :message' },
      tokens: { start: () => '[start]' },
      indent: 0,
    },
  },
];
