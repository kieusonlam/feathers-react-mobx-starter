'use strict';

const app = require('./app');
const port = app.get('port');
const server = app.listen(port);
const path = require('path');

let webpackconfig = path.join(__dirname, '../webpack.config.'+((process.env.NODE_ENV === 'production2') ? 'prod' : 'dev'));
require('child_process').spawn('node',[webpackconfig], { stdio: 'inherit' });

server.on('listening', () =>
  console.log(`Feathers application started on ${app.get('host')}:${port}`)
);
