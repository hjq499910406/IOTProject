import { glob } from 'glob';
import { cpus } from 'node:os';
import { fileURLToPath, URL } from 'node:url';
import { build, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import { createHtmlPlugin } from 'vite-plugin-html';
import genPageEntry from './genPageEntry.mjs';
import fasRuntime from '../plugins/vite-plugin-fas-runtime.mjs';

// 最多可同时运行的子进程数
// const numCpus = cpus().length;
// TODO 20个的时候直接拉满CPU了，只能写小点
const numCpus = Math.min(3, cpus().length);

/**
 * 打包全部页面的工具类
 */
export default class PageBuilder {
  constructor() {
    this.restPages = [];
  }

  /**
   * @summary 获取所有匹配的页面路径
   * @description
   * 匹配对象：
   * 【./src/pages/page-a/】
   * 【./src/pages/page-b/】
   * 【./src/pages/page-c/】
   * 避免匹配到：
   * 【./src/pages/】
   * 【./src/pages/xxx/*.js】
   * 【./src/pages/xxx/*.vue】
   * 
   * 所以这里须只匹配到 page 的文件夹
   * 
   * 顶层 await 需要 nodejs 版本支持且
   * package.json 中设置 type 为 module
   * compilerOptions.target 需要为 es2017 及更高
   * 不然这里就得写成函数调用的形式
   */
  async getAllPages() {
    const pages = await glob('./src/pages/*/');
    return pages;
  }

  getPageConfig(pageName){
    return {
      configFile: false,
      base: `/public/packages/${ pageName }/`,
      plugins: [
        vue(),
        vueJsx(),
        legacy({
          targets: [ 'defaults', 'chrome < 87', 'edge < 88', 'safari < 14' ],
          polyfills: true,
        }),
        createHtmlPlugin({
          minify: false, 
          entry: `../src/pages/${ pageName }/pageEntry.js`,
          template: 'template/index.html',
          inject: {
            data: {
              headerScript:'',
              pageTitle: `${ pageName }`,
            }
          }
        }),
        fasRuntime({
          pageName,
        })
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('../src', import.meta.url)),
        }
      },
      build: {
        report: true,
        cssTarget: [ 'chrome52' ],
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
              'vue': 'Vue',
              'vue-router': 'VueRouter',
              'vue-i18n': 'VueI18n',
            },
            format: 'umd'
          },
          external: (id) => {
            // 自定义逻辑，确定模块是否应被视为外部模块
            return /^vue/.test(id) || id === 'vue-router' || id === 'vue-i18n';
          }
        },
        outDir: `dist/${ pageName }/`,
        emptyOutDir: true,
        copyPublicDir: false,
      },
    };
  }

  /**
   * 页面打包
   * @param {String} pagePath 
   */
  async buildPage(pageName) {
    
    //console.log(`页面打包完成：${pageName}`);

    await genPageEntry(pageName);
    const inlineConfig = defineConfig(this.getPageConfig(pageName));
    await build(inlineConfig);


    // const task = spawn(`pnpm build:page -- target-page=${pageName}`, { shell: true });
    // const task = spawn(`npm run build:page -- -- target-page=${pageName}`, { shell: true });
    // task.stdout.on('data', (chunk) => {
    //   console.log(`building ${pageName}:`, chunk.toString());
    // });
    // debugger
    // await buildByPage(pageName)

    // task.on("exit", () => {
    console.log(`页面打包完成：${ pageName }`);
    return Promise.resolve();
    // 按页面打包，如果还有剩余页面的话，结束一个就再开启一个
    // if (this.restPages.length > 0) {
    //   const takeNext = this.restPages.shift();
    //   console.log(`待打包页面：${takeNext}`);
    //   this.buildPage(takeNext);
    // }
    // });
  }

  /**
   * 根据最大可同时开启进程数进行按页面打包
   * @param {Array<String>} arrPages 
   * @param {Number} maxTaskCountToRun 
   */
  async buildPagesInLimit(arrPages, maxTaskCountToRun) {
    // 首批打包页面
    const buildingPages = arrPages;
    console.log('buildingPages', buildingPages.length);
    // 剩余的页面
    const restPages = maxTaskCountToRun < numCpus ? [] : arrPages.slice(maxTaskCountToRun);
    this.restPages = restPages;
    console.log('restPages', restPages, restPages.length);

    buildingPages.forEach((pagePath) => this.buildPage(pagePath.replaceAll('\\', '/').split('/').pop()));
  }

  /**
   * 开始打包
   */
  async startToBuild(pageNames) {
    const pages = pageNames && pageNames.length ? pageNames : await this.getAllPages();
    const pageCount = pages.length;
    if (pageCount === 0) {
      console.log('No page to build');
    }
    console.log('pages: ', pages);

    const maxTaskCountToRun = Math.min(numCpus, pages.length);

    await this.buildPagesInLimit(pages, maxTaskCountToRun);
  }
}