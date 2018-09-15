const path = require('path');

const buildFolder = path.resolve(__dirname, '../dist');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/index.js',
    devServer: {
        contentBase: buildFolder,
        compress: true,
        port: 9000
    },
    devtool: 'cheap-eval-source-map',
    mode: isProduction ? 'production' : 'development',
    output: {
        filename: 'main.js',
        path: buildFolder
    }
};
