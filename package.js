Package.describe({
  name: 'proyk:chrome-push-notification',
  version: '0.0.1',
  summary: 'Chrome push notifications',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {

  api.use([
    'ecmascript@0.1.6',
    'templating@1.1.5',
    'thepumpinglemma:cookies@1.0.0',
    'proyk:meteor-cookies@0.0.1',
    'mdg:validated-method@0.2.3',
    'http@1.1.1',
    'meteorhacks:picker@1.0.3',
    'aldeed:simple-schema@1.3.3',
    'aldeed:collection2@2.5.0'
  ]);

  api.addFiles([
    'lib/both/collections.js'
  ]);

  api.addFiles([
    'lib/client/serviceWorkerRegistration.js',
    'lib/client/subscriptionManager.js',
    'lib/client/cp-notifications-checkbox.html',
    'lib/client/cp-notifications-checkbox.js',
  ], 'client');

  api.addFiles([
    'lib/server/collections.js',
    'lib/server/methods.js',
    'lib/server/server.js',
    'lib/server/picker.js'
  ], 'server');

  api.export("CpNotification", ['client', 'server']);
});
