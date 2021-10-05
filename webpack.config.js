const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: 'none',
    entry: {
        bundle: './src/index.js'
    },
    output: {
        publicPath: '/',
        filename: '[name].js',
        path: path.resolve(__dirname + '/build')
    },
    devServer: {
        static: path.resolve(__dirname + '/build'),
        port: 4000
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'] // mini-css 플러그인을 style-loader 자리에 대신 써준다. 
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'app.css' // 추출할 css 파일명 정의
        }),
        new CleanWebpackPlugin()
    ]
}