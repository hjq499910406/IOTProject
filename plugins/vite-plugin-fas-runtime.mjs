/**
 * 开发框架编译打包时，为满足运行框架需要，做一些文件处理
 * - 1.删除所打包页面的`index.html`文件
 * - 2.复制出码产物文件`dependencies.js`到所打包页面产物的路径里
 *    如果产物中有`index.css`文件，重新构建依赖即更新`cssEntry`字段
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'url';

// 在 ESM 中获取 __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * 为运行时框架准备打包产物的插件
 * @param {Object} options 
 * @param {String} options.pageName 
 * @returns {undefined | Promise<void>}
 */
function fasRuntime(options) {
  return {
    name: 'fas-runtime',
    async resolveId111(source, importer, options){
      
      console.log(importer,options);
      if (source.startsWith('../template')) {
        return path.resolve(__dirname, source.replace('../template', './template'));
      }
      if(source.indexOf('target-page')!=-1){
        const id = source.replace(/target-page=[^/]*\//g, '').replace(/\//g,'\\');

        if (options.isEntry) {
          // Determine what the actual entry would have been.
          const resolution = await this.resolve(id, importer, options);
          // If it cannot be resolved or is external, just return it
          // so that Rollup can display an error
          if (!resolution || resolution.external) return resolution;
          // In the load hook of the proxy, we need to know if the
          // entry has a default export. There, however, we no longer
          // have the full "resolution" object that may contain
          // meta-data from other plugins that is only added on first
          // load. Therefore we trigger loading here.
          const moduleInfo = await this.load(resolution);
          // We need to make sure side effects in the original entry
          // point are respected even for
          // treeshake.moduleSideEffects: false. "moduleSideEffects"
          // is a writable property on ModuleInfo.
          moduleInfo.moduleSideEffects = true;
          // It is important that the new entry does not start with
          // \0 and has the same directory as the original one to not
          // mess up relative external import generation. Also
          // keeping the name and just adding a "?query" to the ends
          // ensures that preserveModules will generate the original
          // entry name for this entry.
          return id;
        }

      }
      return null;
    },
    closeBundle(err) {
      if (err) {
        console.error(err);
        return;
      }
      const { pageName } = options;

      // 删除index.html
      console.log('\n');
      console.log(`----删除 ${ pageName } 的 index.html 文件----`);

      fs.rmSync(path.resolve(__dirname, `../dist/${ pageName }/index.html`), { force: true });
      // 不同环境下，index.html 可能在不同的位置（多一层 template 文件夹）
      fs.rmSync(path.resolve(__dirname, `../dist/${ pageName }/template/index.html`), { force: true });

      // 复制dependencies
      console.log(`----复制 ${ pageName } 的 dependencies.js 文件----`);
      const srcPath = path.resolve(__dirname, `../src/pages/${ pageName }/`);
      const targetPath = path.resolve(__dirname, `../dist/${ pageName }/`);
      fs.copyFile(`${ srcPath }/dependencies.js`, `${ targetPath }/dependencies.js`, async (err) => {
        if (err) return;
        if (fs.existsSync(`${ targetPath }/index.css`)) {
          const dependencies = await import(pathToFileURL(`${ targetPath }/dependencies.js`));
          dependencies.default.cssEntry = 'index.css';
          const depString = JSON.stringify(dependencies.default);
          fs.writeFile(`${ targetPath }/dependencies.js`, `module.exports = ${ depString }`, () => { });
        }
      });
    }
  };
}

export default fasRuntime;