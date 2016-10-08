'use strict';

const path = require('path');
const app = require('./app');
const api = require('./api');
const port = app.get('port');
const server = app.listen(port);
api.setup(server);

let webpackconfig = path.join(__dirname, '../webpack.config.'+((process.env.NODE_ENV === 'production') ? 'prod' : 'dev'));
require('child_process').spawn('node',[webpackconfig], { stdio: 'inherit' });

server.on('listening', () =>
  console.log(`Feathers application started on ${app.get('host')}:${port}`)
);
