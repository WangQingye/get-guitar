import {
  getUrl
} from './utils.js'
import {
  getUrlImage,
  closeBrowser
} from './browser.js'
import {
  saveImgs
} from './file.js'
import fs from 'fs'
// 循环分页，处理所有分页的歌曲列表
async function getPages() {
  // 现在所有歌曲总共分了53页
  for (let i = 1; i < 3; i++) {
    console.log(`-----------------第${i}页-----------------`);
    await getPageUrl(`https://www.daweijita.com/page/${i}`)
  }
  closeBrowser()
}
async function getPageUrl(url) {
  // 获取当前分页歌曲列表
  let body = await getUrl(url)
  let urls = body.match(/https.*html/g)
  urls = [...new Set(urls)]
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    // 获取具体歌曲网页中的信息，包括标题和图片地址
    try {
      let pageInfo = await getUrlImage(url)
      await saveImgs(pageInfo)
    } catch (error) {
      console.log(`报错了：${url}`);
      fs.writeFile('./err.txt', `${url}\n`, {
        flag: 'a+'
      }, err => {})
    }
  }
}
getPages()