const gulp             = require('gulp');
const gutil            = require('gulp-util');
const webpack          = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

// webpack-dev-server will build files and serve them from memory (no files written to disk)
gulp.task('default', (callback) => {
  let config = require('./webpack.config');
  config.entry.app.unshift(`webpack-dev-server/client?http://${config.devServer.host}:${config.devServer.port}/`);
  new WebpackDevServer(new webpack(config), config.devServer)
    .listen(config.devServer.port, config.devServer.host, (err) => {
      if (err) throw new gutil.PluginError('webpack-dev-server', err);
      gutil.log(gutil.colors.cyan(`http://${config.devServer.host}:${config.devServer.port}`));
    });
});

// output will be built to the `dist` folder.
gulp.task('build', (callback) => {
  let config = require('./webpack.config.js');
  webpack(config, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err);
    stats.toString(config.devServer.stats).split('\n').map((line) => {
      gutil.log(gutil.colors.blue("[webpack]"), line);
    });
    callback();
  });
});
