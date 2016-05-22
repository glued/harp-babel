/*eslint-env node */
'use strict';
const webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', './public/_js/script.js'],
    output: {
        path: __dirname,
        filename: './public/build/script.js'
    },
    module: {
        preLoaders: [
          { test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ },
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude:/node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'stage-0'],
                    plugins: ['transform-remove-console']
                }
            },
        ],
    },
    plugins: [
      new webpack.DefinePlugin({ 'PROD_ENV': true }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
         compressor: { warnings: false }
      })
    ],
    stats: { colors: true }
};
