import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./permission";
import Particles from "vue3-particles";

// 完全引入组件
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";

const app = createApp(App);



// 导入所有自定义svg图标
import 'virtual:svg-icons-register';


// 注册全局组件
import SvgIcon from "./components/svg-icon/index.vue";
app.component(SvgIcon);

// app.use(ElementPlus);
app.use(Particles);
app.use(store);
app.use(router);
app.mount("#app");
