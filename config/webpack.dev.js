const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { DefinePlugin } = require("webpack");
const path = require('path')
const os = require('os')
const threads = os.cpus().length;

module.exports = {
    // entry
    entry: './src/main.js',

    output: {
        // 所有文件的输出路径
        path: undefined,
        //输出的文件名
        filename: "js/[name].js",

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
                use: [
                    {
                        loader: "thread-loader", // 开启多进程
                        options: {
                            workers: threads, // 数量
                        },
                    },
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true, // 开启babel编译缓存
                            cacheCompression: false, // 缓存文件不要压缩
                            plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                        },
                    }]
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
            threads

        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new VueLoaderPlugin(),
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
        // new PreloadWebpackPlugin({
        //     rel: "preload", // preload兼容性更好
        //     as: "script",
        //     // rel: 'prefetch' // prefetch兼容性更差
        // }),
        // new MiniCssExtractPlugin(),

    ],
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vue: {
                    name: "vue",
                    test: /[\\/]node_modules[\\/]vue(.*)[\\/]/,
                    chunks: "initial",
                    priority: 20,
                },
                libs: {
                    name: "chunk-libs",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10, // 权重最低，优先考虑前面内容
                    chunks: "initial",
                },
            }
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`,
        },
        minimizer: [
            // css压缩也可以写到optimization.minimizer里面，效果一样的
            new CssMinimizerPlugin(),
            // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
            new TerserPlugin({
                parallel: threads // 开启多进程
            }),
        ],
    },
    //开发服务器
    devServer: {
        host: '0.0.0.0',
        open: true,
        hot: true,
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
    performance: false,

}