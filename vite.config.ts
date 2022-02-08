import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'

const localEnabled = process.env.USE_MOCK === 'true' || false
const prodMock =  process.env.USE_CHUNK_MOCK === 'true' || false

// https://vitejs.dev/config/
export default defineConfig({
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
  // server: {
  //   proxy: {
  //     '/api': {
  //       changeOrigin: true,
  //       secure: false,
  //       target: ''
  //     },
  //   }
  // }
})
