import { glob } from 'glob';
import { cpus } from 'node:os';
import { fileURLToPath, URL } from 'node:url';
import { build, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { dirname, resolve } from 'node:path';
import genPageEntry from './genPageEntry.mjs';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


function extractObjectFromString(text) {
  // 正则表达式匹配大括号及其内容
  const regex = /{[^]*?};/;
  
  // 执行匹配操作
  const match = text.match(regex);
  
  // 如果匹配成功，返回匹配的内容
  if (match) {
    return match[0];
  } else {
    throw new Error('No matching object found.');
  }
}

// 最多可同时运行的子进程数
// const numCpus = cpus().length;
// TODO 20个的时候直接拉满CPU了，只能写小点
const numCpus = Math.min(3, cpus().length);

function getEntryFiles(entryFile, pageName) {

  //if (!fs.existsSync(entryFile)) {
    // 如果入口文件不存在，你可以在这里创建它或者抛出一个错误
    console.warn(`入口文件不存在: ${ entryFile }，正在创建一个空文件作为占位符`);
    
    const dependenciesFile = entryFile.replace('autoGenEntry','dependencies')
    
    let dependenciesContent = ''
    if(fs.existsSync(dependenciesFile)){
      try {
        const dependenciesInfo = fs.readFileSync(dependenciesFile,'utf8')
        dependenciesContent = extractObjectFromString(dependenciesInfo)
      }
      catch (e) {
      }
    }

    const template = `
        import ${ pageName } from './${ pageName }.vue';
        export { default as ${ pageName } } from './${ pageName }.vue';
        export const dependencies = ${dependenciesContent}
        export default Object.assign(${ pageName }, {
          install: (app, options) => {
            app.component('${ pageName }', ${ pageName });
          },
        });
    `;
    fs.writeFileSync(entryFile, template);
  //}

  // for (const dir of dirs) {
  //   if (dir.isDirectory()) {
  //     const entryPath = resolve(srcPath, 'autoGenEntry.js');
  //     if (!fs.existsSync(entryFile)) {
  //       // 如果入口文件不存在，你可以在这里创建它或者抛出一个错误
  //       console.warn(`入口文件不存在: ${entryPath}，正在创建一个空文件作为占位符`);
  //       fs.writeFileSync(entryPath, '// 占位符文件');
  //     }
  //     entryFiles[dir.name] = entryPath;
  //   }
  // }

  //return entryFiles;
}
function generateLibConfig(pageName) {
  // let config = {};
  const entryFile = resolve(__dirname, '../src/pages', pageName, 'autoGenEntry.js');
  getEntryFiles(entryFile, pageName);
  //for (const [pageName, entry] of Object.entries(entryFiles)) {
  const config = {
    entry: entryFile,
    name: `${ pageName }`,
    fileName: (format) => `portals/${ pageName }.${ format }.js`,
    formats: [ 'umd' ]
  };
  // }
  return config;
}

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
    const portals = [];
    const tasks = [];

    const func = async (item) => {
      try {
        const dependenciesPromise = import(`../${ item.replaceAll('\\', '/') }/dependencies.js`).catch(e=>{});
        return new Promise((resolve)=>{
          dependenciesPromise.then(dependencies=>{
            if(dependencies && (dependencies.default.pageType == 'Portlet')){
              portals.push(item);
              resolve(item);
            }
            resolve(null);
          });
        });
      }
      catch (e) {
        //console.error(e)
      }
      
      return Promise.resolve(null);
    };

    pages.forEach(async (item) => {
      tasks.push(func(item));
    });

    await Promise.all(tasks);

    return portals;
  }

  getPageConfig(pageName) {
    return {
      configFile: false,
      base: `/public/packages/${ pageName }/`,
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('../src', import.meta.url))
        }
      },
      plugins: [ vue() ],
      build: {
        emptyOutDir: false,
        minify: "terser",
        terserOptions: {
          compress: {
            drop_debugger: true
          }
        },
        cssTarget: [ 'chrome52' ],
        cssCodeSplit: true,
        lib: generateLibConfig(pageName),
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          output: {
            globals: {
              'vue': 'Vue',
              'vue-router': 'VueRouter',
              'vue-i18n': 'VueI18n',
              'lodash': '_',
              'echarts': 'echarts',
              'dayjs': 'dayjs',
              'echarts/charts': 'echarts/charts',
              'echarts/components': 'echarts/components',
              'echarts/renderers': 'echarts/renderers',
              '@teld/t-components': 'TComponents',
            },
          },
          external: id => {

            return (
              id === 'vue' ||
              id === 'vue-router' ||
              id === 'vue-i18n' ||
              id === 'lodash' ||
              id === 'moment' ||
              id === 'dayjs' ||
              id === '@teld/t-components' ||
              /^echarts/.test(id)
            );
          },
        }
      }
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

    buildingPages.forEach((pagePath) =>
      this.buildPage(pagePath.replaceAll('\\', '/').split('/').pop())
    );
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
    console.log('portals: ', pages);

    const maxTaskCountToRun = Math.min(numCpus, pages.length);

    await this.buildPagesInLimit(pages, maxTaskCountToRun);
  }
}
