/*global module, process*/
/*eslint no-use-before-define:0 */

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var path = require('path');

// Support for extra commandline arguments
var argv = require('optimist')
            //--env=XXX: sets a global ENV variable (i.e. window.ENV='XXX')
            .alias('e','env').default('e','dev')
            //--minify:  minifies output
            .alias('m','minify')
            .argv;

var config = {
  context: path.join(__dirname),
  entry: ['./main'],
  output: {
    path: path.join(__dirname),
    filename: './bundle.js',
    publicPath: isDevServer() ? '' : ''
  },
  devServer: {
    publicPath: '/'
  },
  reload: isDevServer() ? 'localhost' : null,
  module: {
    loaders: [
      { test: /\.json$/,            loader: 'json-loader' },
      { test: /\.css$/,             loader: 'style-loader!css-loader' },
      { test: /\.less$/,            loader: 'style-loader!css-loader!less-loader' },
      { test: /\.(png|jpg|gif)$/,   loader: 'url-loader?limit=5000&name=[path][name].[ext]' },
      { test: /\.eot$/,             loader: 'file-loader?name=[path][name].[ext]' },
      { test: /\.ttf$/,             loader: 'file-loader?name=[path][name].[ext]' },
      { test: /\.svg$/,             loader: 'file-loader?name=[path][name].[ext]' },
      { test: /\.woff$/,            loader: 'file-loader?name=[path][name].[ext]' },
      { test: /index\.html$/,       loader: 'file-loader?name=[path][name].[ext]' }
    ]
  },
  resolve: {
    alias: {
      'famous-flex': 'famous-flex/src',
      'famous': 'famous/src'
    }
  },
  plugins: [
  ]
};

if (argv.minify) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({mangle:false}));
}

function isDevServer() {
  return process.argv.join('').indexOf('webpack-dev-server') > -1;
}

module.exports = config;
