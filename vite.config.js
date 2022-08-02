import { defineConfig, loadEnv } from 'vite'
import {join} from "path";
import vue from '@vitejs/plugin-vue'

console.log("====文件======",import.meta);
export default defineConfig(({command, mode})=>{

  const env = loadEnv(mode, process.cwd(),"");
  console.log("=====env=====",mode,command);
  return {
    plugins: [vue()],
    resolve:{
      alias: {
        "@": join(__dirname, "src"),
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
      open: true, // 直接打开浏览器配置
    },
  }
})
