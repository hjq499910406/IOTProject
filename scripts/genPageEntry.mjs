/**
 * 在单页模式下，为页面生成入口文件
 */

import { log } from 'node:console';
import { writeFile } from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import ejs from 'ejs';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const writeFileAsync = promisify(writeFile);

/**
 * @param {Object} params
 * @param {String} params.pageName
 */
const genPageEntry = async (pageName) => {

  try {
    // 入口文件定义
    const templatePath = path.resolve(__dirname, '../template/entryTemplate.ejs');
    const dependenciesPath = `../src/pages/${ pageName }/dependencies.js`;
    let dependencies;
    try{
      dependencies = (await import(dependenciesPath)).default;
    }
    catch(ex){
      dependencies = { components:[] };
      console.log(ex);
    }


    const entryJs = await ejs.renderFile(templatePath, { pageName: pageName,dependencies:dependencies }).catch((e) => {
      console.error(e);
    });

    const fileName = path.resolve(__dirname, `../src/pages/${ pageName }/pageEntry.js`);

    await writeFileAsync(fileName, entryJs, { encoding: 'utf-8' });

    console.log('---------');
    console.log('按页面生成入口文件', fileName);

  }
  catch (error) {
    log(error);
    throw new Error(error);
  }

  return Promise.resolve();
};

export default genPageEntry;
