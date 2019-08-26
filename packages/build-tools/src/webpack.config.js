const path = require('path');

const babelOptions = require('./.babelrc.js');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: 'main.bundle.js'
    },
    resolve: {
        extensions: ['.jsx', '.json', '.js', '.css']
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
