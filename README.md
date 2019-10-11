# 博客服务启动

### 目录结构

┌─ admin ------------- 后台管理系统打包后的目录  
├─ dist ------------- 前台打包后的静态资源目录   
├─ server ------------- api服务    
├─ static ------------- 静态资源   
├─ index.html ------------- 由前台系统打包生成    
├─ index.js ------------- 服务启动脚本   
└─ myblog.sql ------------- 数据库转存脚本  

### How to run?  

1. 需要配置node环境，自行百度
2. 安装mysql，转存myblog.sql到数据库
3. 更改 server/config/db.js 如下：

```
...
const database = 'myblog'; // 数据库的名字
const username = 'root'; // 你的数据库管理员
const password = '******'; // 你的管理密码
...
```
4. 命令行运行 npm install
5. node index.js
6. done


### 博客前台

[前台仓库地址](https://github.com/liusshuai/v_blog)  

前台系统基于vue搭建，将前台clone到本地，首先先修改配置：
1. 启动后端服务，即上面的blog_service，通过node index.js启动，查看是否启动成功可以访问相应api测试
2. 修改前提系统的本地服务配置：

```
// vue.config.js

module.exports = {
    ...
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3002', // 修改target为本地启动的服务地址
                ws: true, //是否代理websockets
                changeOrigin: true // 设置同源  默认false，是否需要改变原始主机头为目标URL
            }
        }
    }
}
```  
3. npm install 安装依赖项
4. npm run serve 启动项目
5. 具体进行个性化的修改
6. npm run build 打包
7. 将打包出的dist文件拷贝到blog_service下替换现有的dist，把dist中的index.html移到blog_service的根路径下，重新访问localhost:8080就可以看到自己的修改了


### 博客后台管理系统
[后台仓库地址](https://github.com/liusshuai/r_blog_backstage)

后台系统是基于react开发的，将后台clone到本地，如前台系统一样修改本地配置：

```
// webpack.config.js 

module.exports = {
    ...
    devServer: {
        historyApiFallback: true,
        inline: true,
        port: '8080',
        proxy: {
            '/api': {
                target: 'http://localhost:3002', //修改target为本地启动的服务地址
                changeOrigin: true,
                secure: false
            }
        }
    }
}
```  

1. npm run dev 启动项目
2. npm run build 打包项目
3. 打包后生成build文件，将此文件拷贝到blog_service下替换admin文件(build重命名为admin)，浏览器访问localhost:8080/admin/即可查看当前更新

