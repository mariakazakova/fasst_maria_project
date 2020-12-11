const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

exports.lintJavascript = ({ include, exclude, options = {} }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'eslint-loader',
        options
      }
    ]
  }
});

exports.extractStyling = () => {
  return {
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
      })
    ],
    module: {
      rules: [
        {
          test: [/\.less$/, /\.css$/],
          include: [path.join(__dirname, 'app'), path.join(__dirname, 'node_modules')],
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            },
            { loader: 'less-loader',
              options: {
                lessOptions: () => {
                  return {
                    modifyVars: {
                      'hack': `true; @import "${path.join(__dirname, 'app', 'less', 'antd-custom.less')}";`
                    },
                    javascriptEnabled: true
                  };
                }
              }
            }
          ],
        }
      ]
    }
  };
};

exports.webFonts = () => {
  return {
    module: {
      rules: [
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          include: [path.join(__dirname, 'app'), path.join(__dirname, 'node_modules', 'font-awesome')],
          loader: 'url-loader'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          include: [path.join(__dirname, 'app'), path.join(__dirname, 'node_modules', 'font-awesome')],
          loader: 'file-loader'
        }
      ]
    }
  };
};
