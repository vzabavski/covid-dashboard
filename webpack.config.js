const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry:{
        script: './scripts/script.js',
        keyboard: './scripts/keyboard.js',
        map: './scripts/map.js',
        table:'./scripts/cases.table.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { enforce: 'pre', test: /\.js$/, loader: "eslint-loader"},
            {
                test: /\.css$/, 
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.svg/,
                use: {
                  loader: "svg-url-loader",
                  options: {},
                },
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
        })
    ]
};