const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseWebpackConfig = require(
    '../../../../config/webpack/webpack.config.js'
);

module.exports = {
    ...baseWebpackConfig,
    entry: './src/index.jsx',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};
