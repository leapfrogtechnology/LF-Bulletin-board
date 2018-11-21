const dotenv = require('dotenv');
const webpack = require('webpack');
const resolve = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Initialize environment variables
dotenv.config();

const baseHref = process.env.BASE_HREF;

module.exports = {
  entry: './index.js', // the entry point of our app
  output: {
    publicPath: `/${process.env.BASE_HREF}`,
    chunkFilename: '[id].js',
    path: resolve(__dirname, 'dist'),
    filename: 'js/bundle.[chunkhash].js' // the output bundle
  },
  context: resolve(__dirname, 'src'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: `file-loader?name=[name].[ext]&publicPath=/${baseHref}/images/&outputPath=/images/`
      },
      {
        test: /\.ico$/,
        use: 'file-loader?name=[name].[ext]&publicPath=/images/&outputPath=/'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: `file-loader?name=[name].[ext]&publicPath=/${baseHref}/fonts/&outputPath=/fonts/`
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'] })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/bundle.css'),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public/index.html')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.BASE_HREF': JSON.stringify(process.env.BASE_HREF)
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
