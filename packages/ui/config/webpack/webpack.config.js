const HtmlWebpackPlugin = require('html-webpack-plugin');

const { webpackConfig } = require('@chealt/build-tools');

module.exports = {
    ...webpackConfig,
    entry: './src/index.jsx',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};
