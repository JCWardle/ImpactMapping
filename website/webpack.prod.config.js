const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      API: JSON.stringify('http://52.237.76.8:3000/api/'),
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
});