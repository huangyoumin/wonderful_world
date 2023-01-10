const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: resolve(__dirname, 'src/app.js'),
    output: {
        path: resolve(__dirname, 'build'),
        filename: 'app.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tpl$/,
                use: [
                    // 转换成字符串后使用babel-loader,转换成JavaScript程序
                    'babel-loader',
                    {
                        loader: resolve(__dirname, './loader/tpl-loader.js'),
                        options: {
                            log: true,
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'index.html')
        })
    ],
    devServer: {
        port: 1043,
    }
}