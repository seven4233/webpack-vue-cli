const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");
const CopyPlugin = require("copy-webpack-plugin");
const { DefinePlugin } = require("webpack");
const path = require('path')

module.exports = {
    // entry
    entry: './src/main.js',

    output: {
        // 所有文件的输出路径
        path: undefined,
        //输出的文件名
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        assetModuleFilename: "static/js/[hash:10][ext][query]",
    },
    //加载器
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [

                    'vue-style-loader',
                    'css-loader' //将css打包到
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    'vue-style-loader',
                    'css-loader', 'less-loader'
                ]
            },

            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        //小于11kb转base64格式
                        //优点 : 减小请求数量 缺点：增大体积
                        maxSize: 11 * 1024 // 4kb
                    }
                },
                generator: {
                    filename: 'static/images/[hash:5][ext][query]'
                }
            },
            //统一处理其他资源
            {
                test: /\.(ttf|woff2?|mp4|wav|avi)$/i,
                //resource 不会转换成base64的形式
                type: 'asset/resource',

            },
            {
                test: /\.js$/,
                // exclude: /(node_modules|bower_components)/, //排除目录
                include: path.resolve(__dirname, '../src'),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    plugins: [
                        // "@babel/plugin-transform-runtime" // presets中包含了
                    ],
                },
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    // 开启缓存
                    cacheDirectory: path.resolve(__dirname, "../node_modules/.cache/vue-loader"),
                },
            },






        ]
    },
    //插件
    plugins: [
        new ESLintWebpackPlugin({
            //检测哪些文件
            context: path.resolve(__dirname, '../src'),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache'),

        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new VueLoaderPlugin(),
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public"),
                    to: path.resolve(__dirname, "../dist"),
                    toType: "dir",
                    noErrorOnMissing: true,
                    globOptions: {
                        ignore: ["**/index.html"],
                    },
                    info: {
                        minimized: true,
                    },
                },
            ],
        }),
        // new PreloadWebpackPlugin({
        //     rel: "preload", // preload兼容性更好
        //     as: "script",
        //     // rel: 'prefetch' // prefetch兼容性更差
        // }),
        // new MiniCssExtractPlugin(),

    ],
    optimization: {
        splitChunks: {
            chunks: "all",

        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`,
        },
    },
    //开发服务器
    devServer: {
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },


    resolve: {
        // 自动补全文件扩展名
        extensions: [".vue", ".js", ".json"],
        alias: {
            "@": path.resolve(__dirname, "../src"),
        },
    },


    mode: 'development',
    devtool: 'cheap-module-source-map', //只有行映射

}