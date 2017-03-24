/* eslint-disable one-var, indent, no-unused-vars */

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import failPlugin from 'webpack-fail-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';

const appSourcePath = path.join(__dirname, 'src'),
      publicPath = path.join(__dirname, 'public'),
      nodeModulesPath = path.resolve(__dirname, 'node_modules'),
      babelSettings = JSON.parse(fs.readFileSync('.babelrc'));


const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new ExtractTextPlugin({
    filename: 'style.css',
    disable: false,
    allChunks: true,
  }),
  new webpack.ProvidePlugin({
    jQuery: 'jquery',
    $: 'jquery',
    jquery: 'jquery'
  }),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        sassLoader: {
          includePaths: [
            path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets'),
          ],
          data: '@import "' + path.resolve(__dirname, 'theme/_theme.scss') + '";'
        },
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
    failPlugin,
  );
} else {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/',
        sassLoader: {
          includePaths: [
            path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets'),
          ],
        },
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      syntax: 'scss',
      files: ['src/assets/styles/**/*.scss'],
      failOnError: false,
      quiet: true,
    }),
  );
}

module.exports = {
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
  },
  devtool: 'cheap-module-eval-source-map',
  entry: {
    script: process.env.NODE_ENV === 'production' ? './src/index' : ['./src/index', 'eventsource-polyfill', 'webpack-hot-middleware/client?reload=true'],
    vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'redux-thunk'],
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].js',
  },
  devServer: {
    stats: 'minimal',
    contentBase: path.resolve(__dirname, 'src'),
  },
  plugins,
  resolve: {
    extensions: ['.js', '.scss', '.css', '.json'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      appSourcePath,
    ],
  },
  module: {
    noParse: /node_modules\/quill\/dist/,
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        query: {
          configFile: path.resolve(__dirname, '.eslintrc'),
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          babelrc: true,
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        loader: process.env.NODE_ENV === 'production' ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!postcss-loader',
        }) : ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: process.env.NODE_ENV === 'production' ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!postcss-loader!sass-loader',
        }) : ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?name=fonts/[name].[ext]&limit=1000&mimetype=application/vnd.ms-fontobject',
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?name=fonts/[name].[ext]&limit=1000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?name=fonts/[name].[ext]&limit=1000&mimetype=application/font-woff2',
      },
      {
        test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?name=fonts/[name].[ext]&limit=1000&mimetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?name=images/[name].[ext]&limit=1000&mimetype=image/svg+xml',
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: 'url-loader?name=images/[name].[ext]&limit=1000',
      },
    ],
  },
};
