const path = require("path");
const defaultSettings = require("./src/settings.js");
const mockServer = defaultSettings.openMockServe
  ? require("./mock/mock-serve")
  : null;

function resolve(dir) {
  return path.join(__dirname, dir);
}

const globalTitle = defaultSettings.title;
const port = process.env.port || process.env.npm_config_port || 8100;
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

// const CompressionWebpackPlugin = require("compression-webpack-plugin");

// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: IS_PROD,

  // 编译node_modules里的包为es5语法，主要目的是适用IE浏览器9及以上
  transpileDependencies: [],
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps
    sourceMap: false,
    // modules: true,
    // css预设器配置项
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/scss/index.scss";`,
      },
    },
  },

  configureWebpack: (config) => {
    const plugins = [];
    // plugins.push(
    //   new CompressionWebpackPlugin({
    //     // filename: "[path].gz[query]",
    //     algorithm: "gzip",
    //     test: productionGzipExtensions,
    //     // 大于10kb的会压缩
    //     threshold: 10240,
    //     minRatio: 0.8,
    //     // 删除原文件
    //     deleteOriginalAssets: false,
    //   })
    // );
    config.plugins = [...config.plugins, ...plugins];
  },

  chainWebpack(config) {
    config.name(globalTitle);
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@api", resolve("src/api"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@directives", resolve("src/directives"))
      .set("@views", resolve("src/views"))
      .set("@utils", resolve("src/utils"))
      .set("@layout", resolve("src/layout"));

    config.plugins.delete("preload");
    config.plugins.delete("prefetch");

    // set svg-sprite-loader
    config.module.rules.delete("svg");
    config.module.rule("svg").exclude.add(resolve("src/assets/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();

    // set preserveWhitespace
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        // eslint-disable-next-line no-param-reassign
        options.compilerOptions = {
          preserveWhitespace: true,
        };
        return options;
      })
      .end();

    // config.when(process.env.NODE_ENV === "development", config => config.devtool("cheap-source-map"));

    // eslint-disable-next-line no-shadow
    config.when(process.env.NODE_ENV !== "development", (config) => {
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      config.optimization.runtimeChunk("single");
    });
  },

  // 本地服务器
  devServer: {
    port,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    before: mockServer,
  },
};
