module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,  // 使用浏览器的全局变量
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    sourceType: "module",
    babelOptions: {
      babelrc: false,
      configFile: false,
      // your babel options
      presets: ["@babel/preset-env"],
    },
  },
  rules: {
    "import/extensions": "off",
    "import/no-extraneous-dependencies": [2, { devDependencies: true }],
    "import/no-unresolved": [2, { ignore: ["^@"] }],
    // "no-console": import.meta.env === "production" ? "error" : "off",
    // "no-debugger": import.meta.env === "production" ? "error" : "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    // 总体使用airbnb, 但对一些做一些改进
    // 仅能在循环中使用++符号
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    // 对数组可以不使用析构
    "prefer-destructuring": ["warn", { object: true, array: false }],
    // 对方法中的对象可以直接赋值
    "no-param-reassign": ["warn", { props: false }],
    // 总是指定值或undefined显式或隐式返回
    "consistent-return": ["off", { treatUndefinedAsUnspecified: true }],
    "import/prefer-default-export": "off",
    // 文件导入
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-cycle": "off",
    "import/order": "off",
    // 禁用特定的全局变量
    "no-restricted-globals": "warn",
    // 要求或禁止对象字面量中方法和属性使用简写语法
    "object-shorthand": "warn",
    // 要求 require() 出现在顶层模块作用域中
    "global-require": "off",
    // 禁止 if 语句中 return 语句之后有 else 块
    "no-else-return": "off",
    // 禁止使用特定的语法
    "no-restricted-syntax": "warn",
    // 空语句块
    "no-empty": "warn",
    "no-unused-expressions": "off",
    // 禁止直接调用 Object.prototypes 的内置属性
    "no-prototype-builtins": "warn",
    // 禁止出现未使用过的变量
    "no-unused-vars": ["warn", { vars: "local" }],
    "default-case": "off", // 要求 switch 语句中有 default 分支
    // eqeqeq: "on", // 要求使用 === 和 !==
    "no-lonely-if": "warn", // 禁止 if 作为唯一的语句出现在 else 语句中
    radix: "warn", //  强制在 parseInt() 使用基数参数
    "array-callback-return": "warn", // 强制数组方法的回调函数中有 return 语句
    "no-continue": "off", // 禁止使用continue
    "no-unreachable": "warn", // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    "prefer-rest-params": "warn",
    "no-shadow": "warn",
    "max-classes-per-file": 0, // 允许多个class
  },
};
