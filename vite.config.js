import path, { resolve } from "path";
export default ({ command, mode }) => {
  return {
    // 设置路径的别名
    resolve: {
      alias: {
        "~": resolve(__dirname, "./"),
        "@": resolve(__dirname, "src"),
      },
    },
  };
};
