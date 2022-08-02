#### 1. 运行项目报错:  `TypeError: Cannot read property 'parseComponent' of undefined`

原因: vue-loader版本低
解决方案: `"vue-loader": "^17.0.0",`


#### 2. 使用vite运行报错: ` Internal server error: URI malformed`
原因是html文件问题 <%=BASE_URL不识别%>
解决方案
```
  删除  `<link rel="icon" href="<%= BASE_URL %>favicon.ico">`
```


#### 3. 运行`vite dev`报错:`await import('source-map-support').then((r) => r.default.install())`
解决方案: `更新node版本到v15.6.0`


#### 4. 加载scss文件报错: `internal server error preprocessor dependency sass not found. did you install it vite`
解决方案: `安装sass 重新启动服务`

