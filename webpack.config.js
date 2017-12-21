const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require('webpack');

module.exports = {

    watch: true,

    entry: './src/entry.js',

    output: {
        path: __dirname,
        filename: 'build/bundle.js'
    },


    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            template: 'src/html/pages/index.pug',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: 'src/html/pages/about.pug',
            filename: 'about.html'
        }),
        new HtmlWebpackPlugin({
            template: 'src/html/pages/contact.pug',
            filename: 'contact.html'
        })
    ],

    module: {

        rules: [
            {
                test: /\.es6$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: NODE_ENV == 'development'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['last 4 version']
                                })
                            ]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                        }
                    }
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            }
        ]
    }

};
