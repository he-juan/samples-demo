## 一、webpack 安裝


###  **一、standard**
---

1、安装

```
git init  // 命令创建一个空的Git仓库或重新初始化一个现有仓库。

npm init  // 这个命令用于创建一个package.json。
或
npm init --yes 或 npm init -y  // 从当前目录中提取的信息生成默认的 package.json。创建过程中不会提问。

npm install standard -g 
或 
npm install standard --save-dev
            
npm install snazzy --save-dev // 使输出好看些，带颜色
```


2、使用

```
standard  // 格式校验

standard --verbose | snazzy  // 美化输出，--verbose输出细则名称

standard --fix  // 自动格式化某些问题

```

---
### **二、pre-commit**
---

1、安装

```
npm install husky --save-dev // 安装 husky git 钩子
```


安装好依赖资源后，更改 package.json 文件
```
// package.json
{
 "husky": {
   "hooks": {
     "pre-commit": "standard \"src/**/*.{js,vue,wpy}\" | snazzy",
   }
 }
}
```

2、使用


![title](/api/file/getImage?fileId=5c22eb5609eb7d01f00000dd)



---
### **三、webpack**
---

1、安装
```
npm install webpack -g
或
npm install webpack –save-dev

npm install webpack -g   // 非全局安装时总会出错，所有直接全局安装了
npm install webpack webpack-cli -g  // 4.x以上的webpack需要
```


2、使用

```
webpack –display-error-details  // “–display-error-details”是推荐加上的，方便出错时能查阅更详尽的信息
```

---
### **四、FAQ**
---

1、package.json和package-lock.json的区别

```
package.json  // 主要用来定义项目中需要依赖的包

package-lock.json   //在 `npm install`时候生成一份文件，用以记录当前状态下实际安装的各个npm package的具体来源和版本号。

'^' : 放在版本号之前，表示向后兼容依赖，说白了就是在大版本号不变的情况下，下载最新版的包


项目中引入的包版本号之前经常会加^号，每次在执行npm install之后，下载的包都会发生变化，为了系统的稳定性考虑，每次执行完npm install之后会对应生成package-lock文件，该文件记录了上一次安装的具体的版本号，相当于是提供了一个参考，在出现版本兼容性问题的时候，就可以参考这个文件来修改版本号即可。
```



2、dependencies和devDependencies指定了项目依赖的包。

```
dependencies：这些包在生产中需要。

devDependencies：这些包用于开发和测试。

npm install <package_name> --save 命令会添加条目到 package.json 的 dependencies 中。
npm install <package_name> --save-dev 命令会添加条目到 package.json 的 devDependencies 中。
```


---

[【令人困惑的webpack之entry】](https://segmentfault.com/a/1190000008288240)


## 二、提取公共模块:

### 针对多页面应用

打包的过程中有多个入口文件才有提取公共代码的必要，否则不存在提取公共代码的需求，直接打包到一个文件里就可以了。

输出的时候生成`.bunle.js`文件和`.chunk.js`文件。

```javascript
entry:{
    pageA: './src/pageA.js',
    pageB: './src/pageB.js'
},
output: {
    path:path.resolve(__dirname,'build'),
    filename:'[name].bundle.js',
    chunkFilename:'[name].chunk.js'
}
```

### 分离公共代码的方法

webpack4内置了提取公共代码的配置，用来分离公共代码和共用的第三方模块，`chunks`用来选择需要抽取公共代码的入口文件(chunk)，一般优先分离公共模块，然后再提取自己代码中的共用代码，因此`vendor`具有的优先级`priority`更高。

```javascript
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
```

