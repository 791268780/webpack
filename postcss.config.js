
var autoprefixer = require('autoprefixer');   // css 自动添加浏览器前缀插件
var postcssPxtorem = require('postcss-pxtorem')   // css 自动将px单位转换成rem单位
var postcssPxToViewport = require('postcss-px-to-viewport')   // css 自动将px单位转换成vmin单位



module.exports = {
    plugins: [
        autoprefixer({ // css自动添加前缀
            "overrideBrowserslist": [   // 最新版本使用  overrideBrowserslist  字段
                "defaults",
                "not ie < 11",
                "last 2 versions",
                "> 1%",
                "iOS 7",
                "last 3 iOS versions"
            ]
        }),
        // postcssPxtorem({
        //     rootValue: 37.5,
        //     propList: ['*']
        // }),
        // postcssPxToViewport({
        //     viewportWidth: 1200, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
        //     // viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
        //     unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
        //     viewportUnit: 'vmin', // 指定需要转换成的视窗单位，建议使用vw
        //     selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
        //     minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
        //     mediaQuery: false // 允许在媒体查询中转换`px`
        //   }) ,
      
    ]
};
// css加前缀插件的配置文件