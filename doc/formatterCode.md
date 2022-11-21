#### 一、安装 eslint（保证代码质量）

##### 1. 项目配置 eslint

1.  安装 eslint

```
  pnpm add eslint -wD
```

2. 初始化 eslint,结果在项目根目录创建`.eslintrc.cjs`文件
   初始化完成

```json
module.exports = {
    "env": {
        "browser": true,
        es6: true,
        "node": true,

    },
    "extends": [
        "eslint:recommended",
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    }
}
```

3. 安装依赖解析 vue 里面的`<script>`标签的 js

```
pnpm add eslint-plugin-vue -wD
```

其中 ` eslint-plugin-vue` 插件的默认解析是`vue-eslint-parser`, 也可以自定义配置解析

修改`.eslintrc.cjs`文件

```json
{
   "extends": [
        "eslint:recommended",
      +  "plugin:vue/vue3-recommended"  // 可选择
    ],
}
```

4. 配置命令检查文件

```
"lint": "eslint . --ext .vue,.js --fix"
```

##### 2. vs 配置 eslint

1. 创建`.vscode`文件夹
   `.vscode目录`下创建`settings.json`工作空间配置，配置内容会覆盖`用户settings.json`

2. 安装`vscode插件` -> `eslint`

3. 配置`settings.json`的`eslint`

```json
// settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "vue"]
}
```

#### 二、安装 prettier（代码风格统一）

##### 1. 项目配置 prettier

1. 安装 prettier

```
pnpm add prettier -wD
```

2. 在根目录下新建`.prettierrc.js`配置文件

```
touch .prettierrc.js
```

具体配置项的官方文档[prettier 配置项](https://prettier.io/docs/en/options.html)

```javascript
// .prettierrc.js
module.exports = {
  // 一行的字符数，如果超过会进行换行，默认为80
  printWidth: 160,
  // 一个tab代表几个空格数，默认为80
  tabWidth: 2,
  // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
  useTabs: false,
  // 字符串是否使用单引号，默认为false，使用双引号
  singleQuote: true,
  // 行位是否使用分号，默认为true
  semi: false,
  // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  trailingComma: 'none',
  // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  bracketSpacing: true
}
```

3. 配置命令

```
{
    "scripts": {
        "format": "prettier --write \"./**/*.{html,vue,ts,js,json}\"",
    }
}
```

##### 2. vscode 配置 prettier[prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

在`.vscode/settings.json`设置

```json
{
  // settings.json
  // 默认格式化工具选择prettier
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

#### 三、解决 eslint 与 prettier 的冲突

理论上`eslint`只是负责代码的质量,`prettier`负责代码格式,但是当我们共同使用的时候会出现屏幕一闪格式化又恢复的情况，本质就是`eslint`与`prettier`的部分规则冲突, 所以保存时候运行`eslint`的修复命令，后又运行`prettier`的格式化

解决代码冲突的插件

- eslint-config-prettier 基于 prettier 代码风格的 eslint 规则，即 eslint 使用 pretter 规则来格式化代码
- eslint-config-prettier 禁用所有与格式相关的 eslint 规则，解决 prettier 与 eslint 规则冲突，确保将其放在 extends 队列最后，这样它将覆盖其他配置

```
pnpm add eslint-config-prettier eslint-plugin-prettier -wD
```

在 `.eslintrc.js`中`extends`的最后添加一个配置

```js
{
    extends: [
      'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'   // 解决冲突插件，放在最后
    ],
}

```
