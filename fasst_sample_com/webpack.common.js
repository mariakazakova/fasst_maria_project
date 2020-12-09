const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');
const { title } = require('./package.json');


const path = require('path');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'public/dist'),
};

const VENDOR_LIBS = [
  'lodash',
  'react',
  'ramda',
  'react-dom',
  'react-relay',
  'react-svg',
  'react-router',
  'recompose',
  'redux',
  'validator',
  'prop-types',
  'qs',
  'url'
];

module.exports = merge([
  {
    entry: {
      bundle: `${PATHS.app}/index.js`,
      vendor: VENDOR_LIBS
    },
    output: {
      path: PATHS.build,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      publicPath: '/dist/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/react'],
              plugins: [
                '@babel/plugin-syntax-dynamic-import'
              ],
              cacheDirectory: true
            }
          }
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin({ verbose: true }),
      new WebpackAutoInject({
        SILENT: false,
        PACKAGE_JSON_PATH: './package.json',
        // example:
        components: {
          AutoIncreaseVersion: true,
          InjectAsComment: true,
          InjectByTag: true
        },
        InjectByTag: {
          fileRegex: /\.+/,
          // regexp to find [AIV] tag inside html, if you tag contains unallowed characters you can adjust the regex
          // but also you can change [AIV] tag to anything you want
          AIVTagRegexp: /(\[AIV])(([a-zA-Z{} ,:;!()_@\-"'\\\/])+)(\[\/AIV])/g,
          dateFormat: 'h:MM:ss TT'
        }
      }),
      new HtmlWebpackPlugin({
        title: title || '',
        template: require('html-webpack-template'),
        filename: 'index.html',
        inject: false,
        mobile: true
        /*
        googleAnalytics: {
          trackingId: 'UA-116580580-1',
          pageViewOnLoad: true
        },
        */
      }),
    ],
  },
  parts.lintJavascript({ include: PATHS.app }),
  parts.extractStyling({ include: PATHS.app }),
  parts.webFonts()
]);
