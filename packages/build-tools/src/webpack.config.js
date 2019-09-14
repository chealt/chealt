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
                test: /\.jsx?$/u,
                exclude: /node_modules/u,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions
                }
            },
            {
                test: /\.css$/u,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
