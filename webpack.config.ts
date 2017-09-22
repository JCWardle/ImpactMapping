var path = require('path');
var webpack = require("webpack");

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
        test: /\.html$/,
        loader: 'html-loader'

      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader',
            {
              loader: 'image-webpack-loader',
              query: {
                progressive: true,
                optimizationLevel: 7,
                interlaced: false,
                pngquant: {
                  quality: '65-90',
                  speed: 4
                }
              }
            }
          ]
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
    })
  ]
};