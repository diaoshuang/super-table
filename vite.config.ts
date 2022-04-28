import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import externalGlobals from 'rollup-plugin-external-globals'

const localEnabled = process.env.USE_MOCK === 'true' || false
const prodMock =  process.env.USE_CHUNK_MOCK === 'true' || false

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['vue', 'element-plus', 'echarts'],
      plugins: [
        externalGlobals({
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          echarts: 'echarts'
        }),
      ]
    }
  },
  plugins: [
    vue(),
    viteMockServe({
      // default: '/api'
      mockPath: 'mock',
      watchFiles: true,
      // supportTs: true,
      localEnabled: true,
      prodEnabled: prodMock,
      injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
      `,
      logger: true, //是否在控制台显示请求日志
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  server: {
    proxy: {
      '/api': {
        changeOrigin: true,
        secure: false,
        // target: 'http://localhost:8080' // local
        target: 'https://www.kunqidata.com' // prod
        // target: 'http://10.254.7.167:8080' // prod
      },
      '/erupt-api': {
        changeOrigin: true,
        secure: false,
        // target: 'http://localhost:8080' // local
        target: 'https://www.kunqidata.com' // prod
      },
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 variables.scss 这样就可以在全局中使用 variables.scss中预定义的变量了
        additionalData: '@import "@/statics/styles/variables.scss";',
      },
    },
  },
})
