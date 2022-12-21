import { defineConfig } from 'vite'
import { join } from 'path'
import vue from '@vitejs/plugin-vue'

// 按需引入-自动导入相关
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// svg 加载
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// icon 按需引入
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// jsx
import vueJsx from '@vitejs/plugin-vue-jsx'

import { nodePolyfills } from 'vite-plugin-node-polyfills'

// mock 服务
import { viteMockServe } from 'vite-plugin-mock'

function resolve(dir) {
  return join(__dirname, dir)
}
export default defineConfig(({ command, mode }) => {
  console.log('=====env=====', mode, command)

  const pluginList = [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return tag.startsWith('svg-icon') // (return true)
          }
        }
      }
    })
  ]

  // 自定义element-plus按需导入插件
  pluginList.push(
    AutoImport({
      dts: false,
      resolvers: [
        // 自动导入 Element Plus 相关函数
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon' // 默认是i
        })
      ]
    })
  )
  pluginList.push(
    Components({
      dts: false,
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver({
          importStyle: 'sass' // 设置导入样式sass
        }),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'] // 库的连接符号
        })
      ]
    })
  )

  // svg穿件雪碧图插件
  pluginList.push(
    createSvgIconsPlugin({
      // 指定要缓存的图标文件夹
      iconDirs: [resolve('src/assets/svg-icons')],
      // 执行icon name的格式
      symbolId: 'icon-[name]'
    })
  )

  // icon图标
  pluginList.push(
    Icons({
      compiler: 'vue3',
      autoInstall: true
    })
  )

  // jsx
  pluginList.push(vueJsx({}))

  //node
  pluginList.push(
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true
    })
  )

  // mock 服务
  pluginList.push(
    viteMockServe({
      supportTs: false,
      mockPath: 'mock',
      localEnabled: command === 'serve',
      injectCode: `
      import { setupProdMockServer } from './src/mockProdServer';
      setupProdMockServer();
    `
    })
  )

  return {
    plugins: pluginList,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },

    // css 配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '@/styles/index.scss' as *;`
        }
      }
    },
    // server 配置
    server: {
      cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      port: 8082, // 端口
      https: false,
      host: true, // 显示ip
      open: true // 直接打开浏览器配置
    }
  }
})
