Package.describe({
  name   : 'happyuc:tools',
  summary: 'Helper functions for dapps',
  version: '1.1.5',
  git    : 'http://github.com/happyuc-project/meteor-package-tools',
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use('underscore', ['client', 'server']);
  api.use('mongo', ['client', 'server']);
  api.use('http', ['client', 'server']);
  api.use('spacebars', 'client');
  api.use('templating', 'client');
  api.use('tracker', 'client');
  api.use('3stack:bignumber@2.0.7', 'client');
  api.use('frozeman:persistent-minimongo@0.1.8', 'client');
  api.use('frozeman:storage@0.1.8', 'client');
  api.use('happyuc:webu@1.0.5', ['client', 'server']);

  api.export(['HucTools'], ['client', 'server']);

  api.addFiles('tools.js', ['client', 'server']);
  api.addFiles('ticker.js', ['client', 'server']);
  api.addFiles('globalHelpers.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('happyuc:tools');
  api.addFiles('tools-tests.js', ['client', 'server']);
});
