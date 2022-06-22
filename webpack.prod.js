const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        clean: true,
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.css$/,
                sideEffects: true,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                        },
                    },
                ]
            },
            // {
            //   test: /\.(png|jpe?g|gif|svg|bmp)$/i,
            //   use: [
            //     {
            //       loader: 'url-loader',
            //       options: {
            //         name: '[name].[contenthash:8].[ext]',
            //         limit: 4096,
            //         outputPath: 'assets',
            //       },
            //     },
            //   ],
            // },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Production',
            template: 'public/index.html'
        }),
        new MiniCssExtractPlugin({
            attributes: {
                id: "target",
                "data-target": "example",
            },
        }),
    ],
})