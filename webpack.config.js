const path = require('path');
const webpack = require('webpack');
const isDev = JSON.parse(process.env.NODE_ENV === 'development');
const isProd = JSON.parse(process.env.NODE_ENV === 'prd');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: 'app.css',
    allChunks: true
});
const plugins = [
    new webpack.LoaderOptionsPlugin({
        minimize: isProd,
        debug: isDev
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    extractSass
];

if (isProd) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: true,
        comments: false,
        compress: {
            warnings: false
        }
    }));
}

module.exports = {
    context: path.resolve(__dirname, './client'),
    entry: {
        app: ['./root.js']
    },
    output: {
        path: path.resolve(__dirname, './.build/'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: [
                        'react',
                        [ 'es2015', { modules: false } ],
                        'stage-2'
                    ]
                }
            },
            {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            })
        }]
    },
    plugins: plugins
};
