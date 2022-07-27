// 1. 读取mock文件
require("require-context/register");
const requireContext = require("require-context");
const path = require("path");

const modulesFiles = requireContext(
  path.join(process.cwd(), "mock/modules"),
  true,
  /\.js$/
);
// 遍历读取文件 - 合并数据
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  return [...value];
}, {});

module.exports = modules;
