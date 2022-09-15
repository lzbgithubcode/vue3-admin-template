import { defineConfig, loadEnv } from 'vite'
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import  {join} from "path";
import vue from '@vitejs/plugin-vue'

function resolve(dir) {
  return join(__dirname, dir)
}
export default defineConfig(({command, mode})=>{

  const env = loadEnv(mode, process.cwd(),"");
  console.log("=====env=====",mode,command);
  return {
    plugins: [
      vue(),
      AutoImport({
         resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),],
    resolve:{
      alias: {
        "@": resolve("src"),
      }
    },
   
    // css 配置
    css:{
      preprocessorOptions:{
        scss:{
          additionalData: '@import "@/assets/scss/index.scss";',
        }
      }
    },
     // server 配置
     server:{
      port: 8082, // 端口
      https: false,
      host: true, // 显示ip
      open: true, // 直接打开浏览器配置
    },
  }
})
