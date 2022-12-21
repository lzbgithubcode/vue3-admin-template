#### 1. 运行项目报错: `TypeError: Cannot read property 'parseComponent' of undefined`

原因: vue-loader 版本低
解决方案: `"vue-loader": "^17.0.0",`

#### 2. 使用 vite 运行报错: ` Internal server error: URI malformed`

原因是 html 文件问题 <%=BASE_URL 不识别%>
解决方案

```
  删除  `<link rel="icon" href="<%= BASE_URL %>favicon.ico">`
```

#### 3. 运行`vite dev`报错:`await import('source-map-support').then((r) => r.default.install())`

解决方案: `更新node版本到v15.6.0`

#### 4. 加载 scss 文件报错: `internal server error preprocessor dependency sass not found. did you install it vite`

解决方案: `安装sass 重新启动服务`

#### 5. 项目运行报错`await import('source-map-support').then((r) => r.default.install())`,`SyntaxError: Unexpected reserved word`

解决方案:升级 node 版本，至少**14.18+**

#### 6. vue-router 报错`useRouter() return undefined`

解决方案: useRouter() 不能单独在 js 中使用，只能是在 setup 的组合式 API 中使用

#### 7.`vite dev`之后运行报错`[vite] Internal server error: Cannot read properties of undefined (reading 'length')`

解决方案: 去除 stylelint 相关插件
