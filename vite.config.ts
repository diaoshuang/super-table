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
        target: 'http://82.157.169.92:8080' // prod
      },
    }
  }
})
