const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry:{
        script: './scripts/script.js',
        keyboard: './scripts/keyboard.js',
        table: './scripts/table.js',
        map: './scripts/map.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            //{ enforce: 'pre', test: /\.js$/, loader: "eslint-loader"},
            {
                test: /\.json/i,
                type: "javascript/auto",
                use: [
                    {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                    },
                    },
                ],
                },
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
        }),
        new CopyPlugin({
            patterns: [
              {
                context: path.resolve(__dirname, "dist"),
                from: "../src/scripts/*.json",
              },
            ],
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
          // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
          // `...`
          new JsonMinimizerPlugin(),
        ],
    }
};