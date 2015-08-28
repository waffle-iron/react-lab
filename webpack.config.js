var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');

var entries = {
  'mes': './src/app/index'
};

var dev = process.env.NODE_ENV !== 'production';
var baseDir = __dirname;

var distDir = path.join(baseDir, 'dist');
var bowerDir = path.join(baseDir, 'bower_components');
var ignoreDir = /(node_modules|bower_components)/;

var config = {
  output: {
    path: distDir,
    filename: '[name].js',
    publicPath: '/dist/'
  },
  resolve: {
    root: [bowerDir],
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['src/lib', 'node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({ __DEVTOOLS__: dev }),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(
        'bower.json', ["main", ["main", 0]])
    ),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: ignoreDir,
    }, {
      test: /\.css$/,
      loaders: ['style', 'css']
    }, {
      test: /\.less$/,
      loaders: ['style', 'css', 'less']
    }, {
      test: /\.(png|jpe?g|gif|svg|eot|ttf|otf|woff2?)/,
      loaders: ['file']
    }]
  }
};

if (dev) {
  _.assign(config, {
    devtool: '#cheap-module-inline-source-map',
    entry: Object.keys(entries).reduce(function (settings, key) {
      settings[key] = [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        entries[key]
      ];
      return settings;
    }, {})
  });
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}
else {
  _.assign(config, {
    // devtool: '#inline-source-map',
    entry: Object.keys(entries).reduce(function (settings, key) {
      settings[key] = [entries[key]];
      return settings;
    }, {})
  });
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  );
}

module.exports = config;
