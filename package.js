Package.describe({
  name: 'joephuz:slack-api',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  //forked from https://github.com/krishamoud/meteor-slack-api
  summary: 'Slack API written for meteor',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/joephuz/meteor-slack-api.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('slack-api.js', ['server']);
  api.export("SlackAPI", ['server']);
  api.use('http', ['server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('joephuz:slack-api');
  api.addFiles('slack-api-tests.js', ['server']);
});
