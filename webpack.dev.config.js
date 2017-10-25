var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'main': './src/main.ts',
    'vendor': './src/vendor.ts'
  },
  output: {
    filename: './dist/[name].js'
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: ['.ts', '.tsx','.js']
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        loader: [
          'ts-loader', 
          'angular2-template-loader'
        ],
        exclude: /node_modules/
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/, 
        loader: 'file-loader?limit=100000' 
      },
      {
        test: /\.html$/,
        loader: 'html-loader?caseSensitive=true'
      },
      { 
        test: /\.css$/, loader: "style-loader!css-loader?importLoaders=1" 
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader"
        }]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor']
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    new ExtractTextPlugin('[name].css')
  ]
};