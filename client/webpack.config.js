const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new webpack.DefinePlugin(envKeys),
    ],
    resolve: {
        modules: [__dirname, 'src', 'node_modules'],
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: require.resolve('babel-loader'),
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.png|svg|jpg|gif$/,
                use: ['file-loader'],
            },
        ],
    },
};
