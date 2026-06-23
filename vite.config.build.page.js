/**
 * 在单个页面打包模式下使用的 vite 配置文件
 * TODO 抽 base 配置？
 */

// 基础依赖
import { fileURLToPath, URL } from 'node:url';
// 工具依赖
// import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
// import { createHtmlPlugin } from 'vite-plugin-html';
// import { compression } from 'vite-plugin-compression2'
// 自定义内容

import fasRuntime from './plugins/vite-plugin-fas-runtime.mjs';

// 检查参数，获取目标页面
// const args = process.argv.slice(2);

// const targetPageParma = args.find(n => n.startsWith('target-page='));
// if (!targetPageParma) {
//   throw new Error('target-page not specified.');
// }
// const pageName = targetPageParma.split('=')[1];
// if (!pageName) {
//   throw new Error('value of target-page is empty.');
// }
// console.log(`正在生成页面：【${pageName}】`);

// https://vitejs.dev/config/
// export default defineConfig();


export default function pageConfig(pageName) {
  // 按页面生成入口 pageEntry.js 文件
  //await genPageEntry({ pageName });

  return {
    base: `/public/packages/${ pageName }/`,
    plugins: [
      vue(),
      legacy({
        targets: [ 'defaults', 'chrome < 87', 'edge < 88', 'safari < 14' ],
        polyfills: true,
      }),
      /**
       * HTML 模板插件配置
       * TODO 模板内支持 ejs 语法，但是扩展名改为`.ejs`后【竟然报错】，只能用`.html`?
       */
      // createHtmlPlugin({
      //   minify: false, // 打包出来是给【运行时框架】用的，这里无需压缩
      //   entry: `@/pages/${pageName}/pageEntry.js`,
      //   template: './template/index.html',
      //   inject: {
      //     data: {
      //       // injectData: {
      //       //   jsPath: 'public/packages/',
      //       // },
      //       pageTitle: `${pageName}`,
      //       // injectScript: `<script type="module" src="src/pages/${pageName}/pageEntry.js"></script>`,
      //     }
      //   }
      // }),
      fasRuntime({
        pageName,
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    },
    build: {
      report: true,
      /** @vitejs/plugin-legacy 需要使用 terser */
      minify: false,
      //minify: 'terser',
      rollupOptions: {
        /**
         * 配置 rollup 打包生成的文件是否开启 hash 文件名在这里修改
         */
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name].[ext]',
          globals: {
            'vue': 'Vue'
          },
          format: 'umd'
        },
        external: (id) => {
          // 自定义逻辑，确定模块是否应被视为外部模块
          return /^vue/.test(id);
        }
      },
      outDir: `dist/${ pageName }/`,
      emptyOutDir: true,
      copyPublicDir: false,
    },
  };
}