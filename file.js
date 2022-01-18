import fs from 'fs'
import request from 'request'

export async function saveImgs(info) {
  let {
    title,
    imgUrls
  } = info
  let dir = `./imgs/${title}`
  try {
    fs.mkdirSync(dir)
    downloadImgs()
  } catch (error) {
    // 如果有err说明是已经创建过了
    const files = fs.readdirSync(dir)
    if (files.length < imgUrls.length) {
      downloadImgs()
    } else {
      console.log(`${title}已经下载完成`);
    }
  }

  function downloadImgs() {
    for (let i = 0; i < imgUrls.length; i++) {
      const src = imgUrls[i];
      console.log(`保存${title}-${i+1}`);
      request(src).pipe(fs.createWriteStream(`${dir}/${title}-${i+1}.gif`))
    }
  }
}