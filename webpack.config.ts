var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function root(args) {
  var _root = path.resolve(__dirname, '..');
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

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
        loader: 'html-loader?caseSensitive=true'
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader?limit=100000' 
      },
      {
        test: /\.css$/,
        exclude: root('src'),
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.css$/,
        include: root('src'),
        loader: 'raw-loader'
      },
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