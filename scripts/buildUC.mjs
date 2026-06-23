import { cac } from 'cac'
import PageBuilder from "./ucBuilder.mjs";

const cli = cac('tdev')
cli.option('--target-page <file>', `多个文件用空格分割`)
const parsed = cli.parse()
const pb = new PageBuilder()
const pageName = parsed.options.targetPage
const pages = [pageName].concat(parsed.args)
pages.forEach(async item=> {
  await pb.buildPage(item)
})
