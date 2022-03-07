let webpack=require('webpack')
let path=require('path')

module.exports={
    entry:{
        pageA: './src/pageA.js',
        pageB: './src/pageB.js'
    },
    output: {
        path:path.resolve(__dirname,'build'),
        filename:'[name].bundle.js',
        chunkFilename:'[name].chunk.js'
    },
    mode: "development",
    module:{
        rules:[
            {
                test:/\.js$/,
                use:['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 自己的公共代码
                common: {
                    name: "common",
                    chunks: "all",
                    minSize: 1,
                    priority: 0
                },
                // 第三方代码
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10
                }
            }
        }
    }
}