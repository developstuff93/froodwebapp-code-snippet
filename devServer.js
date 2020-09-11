/*
  eslint-disable consistent-return,
  no-console,
  no-param-reassign,
  import/no-extraneous-dependencies
*/
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import express from 'express';
import proxy from 'proxy-middleware';
import url from 'url';

import config from './src/config';
import webpackDevConfig from './webpack.dev.config';

export default () => {
  const app = express();

  if (!config.isProduction) {
    // Use proxy to webpack dev server for dev environment
    app.use('/assets', proxy(url.parse(`http://localhost:${config.devServerPort}/assets`)));

    app.get('/*', (req, res) => {
      res.sendFile(`${__dirname}/static/index.html`);
    });
  }

  app.listen(config.port, 'localhost', (err) => {
    if (err) {
      return console.log(err);
    }

    console.log(`App listening at http://localhost:${config.port}/`);
  });

  // Run webpack dev server only for dev environment
  if (!config.isProduction) {
    const devServer = new WebpackDevServer(webpack(webpackDevConfig), {
      publicPath: webpackDevConfig.output.publicPath,
      hot: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
      historyApiFallback: true,
      stats: {
        colors: true,
        version: true,
        errors: true,
        warnings: true
      },
    });

    devServer.listen(config.devServerPort, 'localhost', (err) => {
      if (err) {
        return console.log(err);
      }

      console.log(`Webpack Dev Server listening at http://localhost:${config.devServerPort}/`);
    });
  }
};
