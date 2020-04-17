// webpack.prod.js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }),
        new PurgecssPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html'),  { nodir: true }) // purify all unused style
        })
    ]
})