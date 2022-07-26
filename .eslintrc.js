/*
 * @Author: lzb
 * @Date: 2022-06-29 17:46:10
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": ["error"],
    // 总体使用airbnb, 但对一些做一些改进
    // 仅能在循环中使用++符号
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    // 对数组可以不使用析构
    "prefer-destructuring": ["error", { object: true, array: false }],
    // 对方法中的对象可以直接赋值
    "no-param-reassign": ["error", { props: false }],
    // 如果vue文件导入时没有写.vue时
    "import/extensions": ["off"]
  },
};
