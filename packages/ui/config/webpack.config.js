const path = require('path');

const buildFolder = path.resolve(__dirname, 'dist');

module.exports = {
    entry: './src/index.js',
    devtool: 'cheap-eval-source-map',
    output: {
        filename: 'main.js',
        path: buildFolder
    }
};
