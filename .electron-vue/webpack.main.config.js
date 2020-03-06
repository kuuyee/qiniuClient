'use strict';

process.env.BABEL_ENV = 'main';

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MinifyPlugin = require("babel-minify-webpack-plugin");

let mainConfig = {
    entry: {
        main: path.join(__dirname, '../src/main/index.js')
    },
    externals: ['node-notifier', 'worker_threads'],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.node$/,
                use: 'node-loader'
            }
        ]
    },
    node: {
        __dirname: process.env.NODE_ENV !== 'production',
        __filename: process.env.NODE_ENV !== 'production'
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, '../dist/electron')
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'src/main/assets', to: 'assets'},
        ]),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        extensions: ['.js', '.json', '.node']
    },
    target: 'electron-main'
};

/**
 * Adjust mainConfig for development settings
 */
if (process.env.NODE_ENV !== 'production') {
    mainConfig.plugins.push(
            new webpack.DefinePlugin({
                '__static': `"${path.join(__dirname, '../static').replace(/\\/g, '\\\\')}"`
            })
    );
}

/**
 * Adjust mainConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
    mainConfig.plugins.push(
            new MinifyPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"'
            })
    );

    if (process.env.ANALYZER === 'true') {
        mainConfig.plugins.push(
                new BundleAnalyzerPlugin(),
        );
    }
}

if (process.env.NODE_ENV !== 'production') {
    mainConfig.externals = mainConfig.externals.concat(['electron-debug', 'babel-core', 'babel-register']);
}

module.exports = mainConfig;
