import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './permission'
import Particles from 'vue3-particles'

const app = createApp(App)

// 注册全局组件
import SvgIcon from './components/svg-icon/index.vue'
app.component(SvgIcon)
// 导入所有自定义svg图标
import 'virtual:svg-icons-register'

app.use(Particles)
app.use(store())
app.use(router)
app.mount('#app')
