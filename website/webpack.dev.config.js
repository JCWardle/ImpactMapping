const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      API: JSON.stringify('http://localhost:3000/api/'),
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
});