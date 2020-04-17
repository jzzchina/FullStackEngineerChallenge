// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const APP_PATH = path.resolve(__dirname, 'src');

module.exports = {
    entry: path.join(APP_PATH, "index.tsx"),
    output: {
        path: path.join( __dirname, "/dist"),
        filename: "js/[name]-bundle.js"
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                // Include ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(sc|c|sa)ss$/,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },{
                    loader: "css-loader"
                },{
                    loader: 'postcss-loader'
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10 * 1024,       //Convert to base64 if the file is smaller than 10k
                      outputPath: '/img',
                      name: '[name].[contenthash].[ext]'
                    }
                  },
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      pngquant: {
                        quality: '80',
                      }
                    }
                  }
                ]
              }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('Webpack demo banner'),    //Adds a banner to the top of each generated chunk
        new HtmlWebpackPlugin({
            template: path.join(APP_PATH, "index.html")
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]-bundle.css',
        })
    ]
}