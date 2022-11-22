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

#### 三、安装 Stylelint （样式统一/样式检测）

##### 1. 项目配置 Stylelint

1. 安装 [stlyelint](https://stylelint.io/user-guide/get-started)以及依耐

```
   pnpm add stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-order -wD
```

所有依耐说明

- [stlyelint](https://stylelint.io/user-guide/get-started) css 工具
- [postcss](https://www.postcss.com.cn/)转换 css 代码工具
- [postcss-scss](https://www.npmjs.com./package/postcss-scss)识别 scss 语法的插件
- [postcss-html](https://www.npmjs.com./package/postcss-html) 识别 `html/vue` 中的` <style></style>` 标签中的样式
- [stylelint-config-prettier](https://www.npmjs.com./package/stylelint-config-prettier)关闭所有不必要或可能与 `Prettier` 冲突的规则
- [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) 默认 css 配置规则
- [stylelint-config-standard-scss](https://www.npmjs.com./package/stylelint-config-standard-scss)scss 的推荐可共享配置规则

- [stylelint-config-recommended-vue](https://www.npmjs.com/package/stylelint-config-recommended-vue).vue 文件的推荐样式配置

- [stylelint-order](https://www.npmjs.com./package/stylelint-order)指定样式书写的顺序，在 .`stylelintrc.js` 中 `order/properties-order `指定顺序

2. 在根项目创建`.stylelintrc.js`文件，并配置文件

```
touch  .stylelintrc.js
```

配置文件

```javascript
// .stylelintrc.js
module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-standard-vue',
    'stylelint-config-prettier' //一定要放在最后
  ],
  // 不同格式的文件指定自定义语法
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss'
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html'
    }
  ],
  // 引入排序插件
  plugins: ['stylelint-order'],
  // 忽略文件
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml'
  ],
  rules: {
    // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'no-descending-specificity': null,
    // 类选择器的命名规则
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected class selector to be kebab-case'
      }
    ],
    // 指定样式的排序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'flex',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'font-size',
      'font-family',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transform',
      'transition',
      'content'
    ]
  }
}
```

4. `package.json` 检测脚本配置

```json
// package.json
{
  "scripts": {
    "eslint": "eslint . --ext .vue,.js",
    "eslint:fix": "eslint . --ext .vue,.js --fix",
    "style": "stylelint \"./**/*.{css,scss,sass,vue,html}\"",
    "style:fix": "stylelint \"./**/*.{css,scss,sass,vue,html}\" --fix",
    "lint": "pnpm run eslint && pnpm run style",
    "lint:fix": "pnpm run eslint:fix && pnpm run style:fix",
    "format": "prettier --write \"./**/*.{html,vue,js,json}\""
  }
}
```

##### 2. vscode 配置 Stylelint

vscode 工具[Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) 可配置在保持时候格式化 style 不用等到执行命令`npm run style:fix`

修改`.vscode/settings.json`文件新增规则

```json
  // .vscode/settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true,
    // 新增stylelint 保存时候
 +   "source.fixAll.stylelint": true
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "vue"],
  // "[vue]": {
  //   // vue 文件保存时候的格式化方案vetur
  //   "editor.defaultFormatter": "Vue.volar"
  // },
  // 默认格式化工具选择prettier
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  // stylelint校验的文件格式
  +  "stylelint.validate": ["css", "scss", "sass", "html", "vue"]
}


```
