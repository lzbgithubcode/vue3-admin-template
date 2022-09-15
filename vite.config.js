import { defineConfig, loadEnv } from 'vite'
import  {join} from "path";
import vue from '@vitejs/plugin-vue'

// 按需引入-自动导入相关
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// svg 加载
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';

function resolve(dir) {
  return join(__dirname, dir)
}
export default defineConfig(({command, mode})=>{

  const env = loadEnv(mode, process.cwd(),"");
  console.log("=====env=====",mode,command,resolve('src/assets/svg-icons'));

  const pluginList = [vue()];

  // 自定义导入插件
  pluginList.push(
    AutoImport({
       resolvers: [ElementPlusResolver()],
    })
  )
  pluginList.push(
    Components({
      resolvers: [ElementPlusResolver()],
    })
  )

  // svg穿件雪碧图插件
  pluginList.push(createSvgIconsPlugin({
     // 指定要缓存的图标文件夹
     iconDirs: [resolve('src/assets/svg-icons')],
     // 执行icon name的格式
     symbolId: 'icon-[name]',
  }));

  return {
    plugins: pluginList,
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
