const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
const openBrowserPlugin = require('open-browser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: [
        'webpack-hot-middleware/client?reload=true',
        './src/app.js'
    ],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/[name]-bound.js'//生成后的文件名 为 a-2ea5b2e9b258a8bbba73.js，main-2ea5b2e9b258a8bbba73.js
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                /*exclude: path.resolve(__dirname, 'node_modules'), //编译时，不需要编译哪些文件*/
                /*include: path.resolve(__dirname, 'src'),//在config中查看 编译时，需要包含哪些文件*/
                query: {
                    presets: ['latest'] //按照最新的ES6语法规则去转换
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.tpl$/,
                loader: 'ejs-loader'
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader?importLoaders=1", "postcss-loader"]
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!postcss-loader!sass-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: ['url-loader?limit=1', 
                {
                    loader: 'image-webpack-loader',
                    options: {
                        bypassOnDebug: true, // webpack@1.x
                        disable: true, // webpack@2.x and newer
                      }
                }]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html', //通过模板生成的文件名
            template: 'index.html',//模板路径
            inject: 'body' //是否自动在模板文件添加 自动生成的js文件链接

        }),
        new openBrowserPlugin({ 
            url: 'http://localhost:3000' 
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};