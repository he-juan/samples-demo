## 一、安装gulp
   1. 安装 gulp 命令行工具
     > npm install --global gulp-cli
     
   2. 在项目目录下创建 package.json 文件
     > npm init
     
   3. 安装 gulp，作为开发时依赖项
     > npm install --save-dev gulp
     
   4. 检查 gulp 版本
     > gulp --version
   
  ------ 
  
##  二、创建 gulpfile 文件        
  1. 利用任何文本编辑器在项目大的根目录下创建一个名为 gulpfile.js 的文件，并在文件中输入以下内容：
    
     ```javascript
         function defaultTask(cb) {
           // place code for your default task here
           cb();
         }
         
         exports.default = defaultTask
     ```
     
  2. 测试：在项目根目录下执行 gulp 命令。
       > gulp 
  
  ---- 
  
## 三、gulpfile 文件处理
  
   1.向流（stream）中添加文件
     - src() 也可以放在管道（pipeline）的中间，以根据给定的 glob 向流（stream）中添加文件。新加入的文件只对后续的转换可用。如果 glob 匹配的文件与之前的有重复，仍然会再次添加文件。
   ```javascript
         const { src, dest } = require('gulp');
         const babel = require('gulp-babel');    // 语法转换:es6 转换 es5
         const uglify = require('gulp-uglify');  // 压缩
         exports.default = function() {
           return src('src/*.js')
             .pipe(babel())
             .pipe(src('vendor/*.js'))
             .pipe(uglify())
             .pipe(dest('output/'));
         }
   ```
  
  2. 分阶段输出：
     - dest() 可以用在管道（pipeline）中间用于将文件的中间状态写入文件系统。当接收到一个文件时，当前状态的文件将被写入文件系统，文件路径也将被修改以反映输出文件的新位置，然后该文件继续沿着管道（pipeline）传输。
    ```javascript
    const { src, dest } = require('gulp');
    const babel = require('gulp-babel');
    const uglify = require('gulp-uglify');
    const rename = require('gulp-rename');
    
    exports.default = function() {
      return src('src/*.js')
        .pipe(babel())
        .pipe(src('vendor/*.js'))
        .pipe(dest('output/'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('output/'));
    }
    ```  
  -------
  
##  四、gulp-babel报错处理
  
  1. 安装es6转es5所需要的包

    ```javascript
        // babel 依赖的包 但是看babel官方说并没有依赖这个如果不安装会报错
        npm install babel-core --save-dev
        // 转码所需要的模板
        npm install babel-preset-env --save-dev
        // babel转码的核心包这里安装7的版本如果不写默认安装8.0.0的版本
        //但是在npm上看到的是最新版本是7的 如果安装了8的版本会一直报找不到babel-core的错误
        npm install gulp-babel@7 babel-core --save-dev
        // 用非严禁模式编译
        npm install babel-plugin-transform-remove-strict-mode --save-dev
    ```   
    
   2. 在gulpfile.js同级目录下新建一个配置文件.babelrc，内容如下：
   
    ```javascript
    {
        "presets": [
          [ "env",
            { "modules": false }
          ]
        ],
        "plugins": ["transform-remove-strict-mode"]
      }
    ```  
  3. .gulpfile.js中引入babel
    > const babel = require('gulp-babel')
    
  
  4. 转换js代码
  
    ```javascript
        const { src, dest } = require('gulp');
        const babel = require('gulp-babel');
        
        exports.default = function() {
          return src('src/*.js')
            .pipe(babel())
            .pipe(dest('output/'));
        }
    ```    
 ----
 
## 五、gulp-uglify报错
   > npm install --save-dev gulp-uglify gulp-concat gulp-minify-css
---

## 六、gulp-rename报错
   > npm install gulp-rename   
   
## 七、案例

```javascript
const { src, dest } = require('gulp');
const babel = require('gulp-babel');    // 语法转换
const uglify = require('gulp-uglify');  // 压缩文件
const rename = require('gulp-rename');
const concat = require('gulp-concat');   // 合并文件
// const foreach = require('gulp-foreach');  // 文件循环

exports.default = function() {
    return src('js/*.js')
        .pipe(babel())
        .pipe(dest('output/api/'))
        .pipe(concat('gsRTC.min.js'))
        .pipe(dest('output/'))
}

exports.default = function() {
    return src('js/*.js')
        .pipe(babel())
        .pipe(dest('output/'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('output/'));
}
```   
   
   -------
## 参考链接
   1. [gulp官网](https://www.gulpjs.com.cn/docs/getting-started/working-with-files/)
   2. [gulp使用gulp-babel时报错Cannot find module 'gulp-babel'解决步骤](https://www.cnblogs.com/xiruyue/p/13634901.html)