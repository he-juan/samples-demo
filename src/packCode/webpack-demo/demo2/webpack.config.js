var path = require('path');
var b_release_mode = true;     // 是否压缩？
var releaseJs = [
    './js/index.js',
    './js/main.js'
]
module.exports = {
    mode: "development",
    devtool: 'source-map',   // 生成Source Maps
    entry:{   // 入口文件
        index: b_release_mode ? releaseJs : ['./ul_release.js'],
    },
    output: {   // 出口文件
        filename:'[name].js',
        path: path.resolve(__dirname,'dist'),
        publicPath: '/dist',
    },
    devServer: {
        contentBase: "./",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }
}