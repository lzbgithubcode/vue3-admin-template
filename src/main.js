/*
 * @Author: lzb
 * @Date: 2022-06-29 17:46:10
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./permission";

// 完全引入组件
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(ElementPlus);
app.use(store);
app.use(router);
app.mount("#app");
