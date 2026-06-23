import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host:'0.0.0.0',
    allowedHosts:true,
    watch:{
      ignored: [ '**/node_modules/**', '**/dist/**' ],
      usePolling: true,
      interval: 1000
    }
  },
  build:{
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_debugger: true
      }
    },
    cssTarget: [ 'chrome52' ],
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    legacy({
      targets: [ 'defaults', 'chrome < 87', 'edge < 88', 'safari < 14' ],
      polyfills: true,
    }),
    createHtmlPlugin({
      minify: false, 
      template: './index.html',
      inject: {
        data: {
          isPCModel:true,
          headerScript:`
              <script src="/config/app.setting.js" crossorigin="anonymous"></script>
              <script src="//resource.teld.cn/platform/thirdpart/js/jquery-2.1.4.min.js" crossorigin="anonymous"></script>
              <script src="//resource.teld.cn/platform/teld/js/teld-performance.min.js" crossorigin="anonymous"></script>
              <script src="//resource.teld.cn/platform/teld/js/teld-thirdpart.min.js" crossorigin="anonymous"></script>
              <script src="//resource.teld.cn/platform/teld/js/teld-core.min.js" crossorigin="anonymous"></script>
              <script src="//resource.teld9.xyz/tff/api/common/teld-monitor.umd.js"></script>
              <script src="//resource.teld.cn/fas/echarts.min.js?_v=1" crossorigin="anonymous"></script>`,
          bodyScript: `
              <script src="//resource.teld9.xyz/tff/api/common/teld-external.min.js"></script> 
              <script src="//resource.teld9.xyz/tff/api/common/teld-plugin-fas-all.umd.js"></script> 
          `,
      
        }
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
