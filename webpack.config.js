
var webpack = require('webpack'); 
var HtmlWebpackPlugin = require('html-webpack-plugin'); //打包。压缩html的插件
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 独立打包css插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // js压缩插件
const path = require('path');
// const CleanWebpackPlugin  = require('clean-webpack-plugin');

let file_name = ''

module.exports = {
    entry: {
        index: "./web/js/index.js",       //多个js分别打包
        "2": "./web/js/2.js",       //多个js分别打包
		config: "./web/js/config.js"
    },
    // entry: {
    //     // mian:[ './app/main.js','./app/1.js','./app/2.js'],  // 多个js 打包成一个文件
    // },
    output: {
        path:path.resolve(__dirname,'build'),
        filename: "[name]/[name].js"  ,// 打包输出的文件
		hotUpdateChunkFilename: 'hot/hot-update.js', // 阻止热更新时生成json文件
		hotUpdateMainFilename: 'hot/hot-update.json'
    },
    mode: "production",   // 工作模式
    module:{
        // rules: [
        //     { test: /\.css$/, use: ['style-loader','css-loader'] } // css 和js 打包在一起
        // ]
        rules: [ // css 独立打包
			{   
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets:[  //  es6转es5      待验证
						[
							'@babel/preset-env',
							{
								useBuiltIns: 'usage',  //按需加载
								corejs: { // 指定 core-js 版本
									version: 3
								},
								targets: { // 指定做到那个版本的浏览器  兼容
									chrome: "60",
									firefox: "60",
									ie: "9",
									safari: "10",
									edge: "17"
								}
							}
						]
					]
				}
				
			},
            {
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader!postcss-loader",   // postcss-loader 配合 autoprefixer css 前面加前缀
				}),
            },
			{  
				test:/\.styl(us)?$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
						}
					},
					'stylus-loader'
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 1000, // 小于  转base64
					esModule:false,  // 解决  file-loader  升级后  不兼容  html-withimg-loader的问题
					name: '/image/[name].[hash:10].[ext]'
				}
			},
			{  // 处理html中的img路径
				test: /\.(htm|html)$/i,
				loader: 'html-withimg-loader'
			},
          ]
    },
    watch: true,   // 监听修改自动打包
    plugins:[
		// new CleanWebpackPlugin(),
		new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery'}),  // 全局引入jq
		new webpack.HotModuleReplacementPlugin(), // 热更新
        new webpack.BannerPlugin('webpack'), // 输出文件前面加注释 插件
        new HtmlWebpackPlugin({
            chunks: ["index","config"], // 模块注入
            filename:'index.html',  // 编译完的html存放路径
            template:'./web/index.html',   //  要编译的HTML模板路径
            minify: {
                collapseWhitespace: true,//html压缩  删除html空格、换行
            },
        }),
		new HtmlWebpackPlugin({
		    chunks: ["2","config"],
		    filename:'2.html',  // 编译完的html存放路径
		    template:'./web/2.html',   //  要编译的HTML模板路径
		    minify: {
		        collapseWhitespace: true,//html压缩  删除html空格、换行
		    },
		}),
        new ExtractTextPlugin({
			filename:'[name]/[name].[hash].css',//随机名称
			allChunks:true
		}),//css打包后的文件路径
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({ // js压缩插件配置
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})] // css压缩插件配置
    },
	// devServer: {
	//     proxy: { // proxy URLs to backend development server
	//       '/api': 'http://localhost:9000'
	//     },
	//     contentBase: path.join(__dirname), // boolean | string | array, static file location
	//     compress: true, // enable gzip compression
	//     historyApiFallback: true, // true for index.html upon 404, object for multiple paths
	//     hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
	//     https: false, // true for self-signed, object for cert authority
	//     noInfo: true, // only errors & warns on hot reload
	//     // ...
	// },
};