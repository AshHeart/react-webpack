const htmlWebpackPlugin = require('html-webpack-plugin')
const liveReloadPlugin = require('webpack-livereload-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

let plugins = []

module.exports = (env = {}) => {
    const isProduction = env.production === true

    plugins.push(new miniCssExtractPlugin({
        filename: 'css/main.bundle.css'
    }))

    plugins.push(new htmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
        minify: true
    }))

    if(isProduction) {
        plugins.push(new uglifyJsPlugin({
            test: /\.js($|\?)/i,
            uglifyOptions: {
                output: {
                    comments: false,
                     beautify: false
                }
            }
        }))
    } else {
        plugins.push(new liveReloadPlugin())

        plugins.push(new webpack.HotModuleReplacementPlugin())
    }

    return {
        entry: {main: './src/main.js'},
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'main.min.js'
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        plugins: plugins,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.(sass|scss)$/,
                    use: [
                        'style-loader',
                        miniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, './dist'),
            watchContentBase: true,
            compress: true,
            port: 8080
        }
    }
}