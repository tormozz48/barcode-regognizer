'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src');
const ouputPath = path.resolve(__dirname, 'dist');

module.exports = {
    entry: {
        bundle: [
            path.join(srcPath, './index.css'),
            path.join(srcPath, './index.js')
        ]
    },
    context: srcPath,
    output: {
        path: ouputPath,
        filename: '[name].min.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {minimize: true}
                    }]
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'stage-0']
                    }
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].min.css'),
        new HtmlWebpackPlugin({
            title: 'Bar code recognizer',
            cache: true,
            showErrors: true,
            template: path.join(srcPath, 'index.html')
        })
    ]
};
