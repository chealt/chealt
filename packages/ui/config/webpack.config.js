const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildFolder = path.resolve(__dirname, '../dist');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/index.jsx',
    devServer: {
        contentBase: buildFolder,
        compress: true,
        overlay: true,
        port: 9000
    },
    devtool: 'source-map',
    mode: isProduction ? 'production' : 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        filename: 'main.js',
        path: buildFolder
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test:/\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};
