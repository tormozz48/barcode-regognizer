'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const outputPath = path.resolve(__dirname, 'dist');
const commonConfig = require('./webpack.common');

module.exports = merge(
    commonConfig,
    {
        devtool: 'eval-source-map',
        devServer: {
            contentBase: outputPath,
            historyApiFallback: true,
            inline: true,
            hot: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }
);
