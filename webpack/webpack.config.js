
var webpack = require('webpack'); 
var HtmlWebpackPlugin = require('html-webpack-plugin'); //打包。压缩html的插件
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 独立打包css插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // js压缩插件

module.exports = {
    // entry: {
    //     mian1: "./app/main.js",       //多个js分别打包
    //     mian2: './app/1.js',
    //     mian3: './app/2.js'
    // },
    entry: {
        mian:[ './app/main.js','./app/1.js','./app/2.js'],  // 多个js 打包成一个文件
    },
    output: {
        path: __dirname,
        filename: "./script/[name].js"  // 打包输出的文件
    },
    mode: "production",   // 工作模式
    module:{
        // rules: [
        //     { test: /\.css$/, use: ['style-loader','css-loader'] } // css 和js 打包在一起
        // ]
        rules: [ // css 独立打包
            {
              test: /\.css$/,
              use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
              })
            }
          ]

    },
    watch: true,   // 监听修改自动打包
    plugins:[
        new webpack.BannerPlugin('菜鸟教程 webpack 实例'), // 输出文件前面加注释 插件
        new HtmlWebpackPlugin({
            // chunks:['app/dist/js/index'],
            filename:'./script/index.html',  // 编译完的html存放路径
            template:'./app/index.html',   //  要编译的HTML模板路径
            minify: {
                collapseWhitespace: true,//html压缩  删除html空格、换行
            },
        }),
        new ExtractTextPlugin("./script/[name].css"),//css打包后的文件路径
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({ // js压缩插件配置
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})] // css压缩插件配置
    }
};