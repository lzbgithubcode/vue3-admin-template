const mockServer = require("mockjs");
const path = require("path");
const bodyParser = require("body-parser");
const mockDir = path.join(process.cwd(), "mock/modules");
const chalk = require("chalk");
const chokidar = require("chokidar");

module.exports = (app) => {
  console.log(chalk.magentaBright("`\n >mock系统启动...."));
  require("@babel/register");
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  const mockRoutes = registerRoutes(app);
  let { mockRoutesLength, mockStartIndex } = mockRoutes;

  // 热更新观察
  chokidar.watch(mockDir, {}).on("all", (event, path) => {
    if (event === "change" || event === "add") {
      try {
        // remove mock routes stack
        app._router.stack.splice(mockStartIndex, mockRoutesLength);

        // clear routes cache
        unregisterRoutes();

        const mockRoutes = registerRoutes(app);
        // eslint-disable-next-line prefer-destructuring
        mockRoutesLength = mockRoutes.mockRoutesLength;
        // eslint-disable-next-line prefer-destructuring
        mockStartIndex = mockRoutes.mockStartIndex;

        console.log(
          chalk.magentaBright(
            `\n > Mock Server 热更新启动成功! changed  ${path}`
          )
        );
      } catch (error) {
        console.log(chalk.redBright(error));
      }
    }
  });
  //
};

/**
 * 注册所有的路由
 */
function registerRoutes(app) {
  const modules = require("./index.js");
  let mockLastIndex = 0;

  const mockServe = modules.map((route) => {
    return interceptRequest(route.url, route.type, route.response);
  });

  for (const mock of mockServe) {
    app[mock.type](mock.url, mock.response);
    mockLastIndex = app._router.stack.length;
  }
  const mockRoutesLength = Object.keys(mockServe).length;

  return {
    mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  };
}
/**
 * 取消注册所有的路由
 */
function unregisterRoutes() {
  Object.keys(require.cache).forEach((i) => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)];
    }
  });
}
/**
 * 拦截请求
 */
function interceptRequest(url, type, respond) {
  let relativeUrl = `${process.env.VUE_APP_BASE_API}${url}`;
  relativeUrl = relativeUrl.replace("//", "/");
  return {
    url: new RegExp(relativeUrl),
    type: type || "get",
    response(req, res) {
      const mock = mockServer.mock(
        respond instanceof Function ? respond(req, res) : respond
      );
      console.log(`\n`);
      console.log(`---------------------------------`);
      console.log(`请求路径: ${req.path}`);
      console.log(`请求参数: ${JSON.stringify(req.body)}`);
      console.log(`返回数据: ${JSON.stringify(mock)}`);
      res.json(mock);
    },
  };
}
