
//const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ["babel-polyfill", "./src/js/app.js"],

    output: {
        filename: 'static/js/app.js',
        path: __dirname + '/dist/',
        publicPath: './'
    },

    module: {
        rules: [
            { 
                test: /\.scss$/, 
                loader: ExtractTextPlugin.extract({ 
                    fallbackLoader: "style-loader", 
                    use:[
                        {
                            loader: "css-loader",
                            options: { 
                                minimize: true, 
                                sourceMap:true 
                            }
                        }, {
                            loader: 'sass-loader',
                            options: { 
                                minimize: true, 
                                sourceMap:true 
                            }
                        }
                    ],
                }) 
            }, 
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                exclude: /(fonts)/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'static/img/'
                    }
                }]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "eslint-loader"
            }, 
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                'env', {
                                    "targets": {
                                        "ie": 11
                                    }
                                }
                            ]
                        ]
                    }
                }
            }, 
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                exclude: /(img)/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'static/fonts/'
                    }
                }]
            }],
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        devtool: 'source-map',
        plugins: [
            new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery", "window.jQuery": "jquery'", "window.$": "jquery" }),
            new ExtractTextPlugin({
                filename:'static/css/style.css',
                allChunks: true
            }),
            new HtmlWebpackPlugin({  
                filename: 'index.html',
                chunks: ["index"],
                template: 'src/index.html'
            })
        ],
    };