var webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', './public/_js/script.js'],
    output: {
        path: __dirname,
        filename: './public/build/script.js'
    },
    module: {
        preLoaders: [
          {test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/},
          {test: /\.js$/, loader: 'jscs-loader', exclude: /node_modules/},
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015'],
                    plugins: ['transform-remove-console']
                }
            },
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
           compressor: {
             warnings: false
           }
        }),
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        colors: true
    }
};
