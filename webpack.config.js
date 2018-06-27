const webpack = require('webpack')
const path = require('path')
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const liveReloadPlugin = require('webpack-livereload-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env = {}) => {
    const isProduction = env.production === true

    return {
        entry: {main: './src/main.js'},
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'main.min.js'
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        plugins: (() => {
            if(isProduction)
                return [
                    new uglifyJsPlugin({
                        test: /\.js($|\?)/i,
                        uglifyOptions: {
                            output: {
                                comments: false,
                                 beautify: false
                            }
                        }
                    }),
                    new htmlWebpackPlugin({
                        template: 'src/index.html',
                        filename: 'index.html',
                        minify: true
                    })
                ]
            else
                return [
                    new liveReloadPlugin(),
                    new webpack.HotModuleReplacementPlugin(),
                    new htmlWebpackPlugin({
                        template: 'src/index.html',
                        filename: 'index.html'
                    })
                ]
        })(),
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
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