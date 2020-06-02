const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const nodeEnv = process.env.NODE_ENV || 'development'

const isProd = nodeEnv === 'production'

module.exports = {
  optimization: isProd
    ? {
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              ecma: 6
            }
          })
        ]
      }
    : {},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|png|jpg|jpeg|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: './index.html'
    })
  ],
  entry: ['whatwg-fetch', path.resolve(__dirname, 'src/index.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: `bundle${isProd ? `.min` : ''}.js`
  },
  devServer: {
    contentBase: './dist',
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true
  }
}
