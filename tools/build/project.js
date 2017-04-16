/* eslint-disable no-console, no-unused-vars */

import webpack from 'webpack';
import colors from 'colors';
import webpackConfig from '../../webpack.config.babel';

process.env.NODE_ENV = 'production';

console.log('generating...');

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if (jsonStats.hasWarnings) {
    console.log('webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  console.log(`webpack stats:${stats}`);
  console.log('app has been compiled'.green);
  return 0;
});
