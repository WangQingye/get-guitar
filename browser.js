import puppeteer from 'puppeteer'
let browser;
async function initBrowser() {
  browser = await (puppeteer.launch({
    userDataDir: 'puppeteer-user-dir',
    //设置超时时间
    timeout: 15000,
    //如果是访问https页面 此属性会忽略https错误
    ignoreHTTPSErrors: true,
    // 打开开发者工具, 当此值为true时, headless总为false
    devtools: false,
    // 关闭headless模式, 不会打开浏览器
    headless: true
  }));
}
export async function getUrlImage(url) {
  if (!browser) await initBrowser()
  const page = await browser.newPage();
  await page.goto(url);
  let info = await getResult()
  // 如果第一次没取到，那么有可能是页面加载慢，那就等3秒钟，再取一次
  if (!info.imgUrls.length) {
    await page.waitFor(2000);
    info = await getResult()
  }
  async function getResult() {
    let result = await page.evaluate(() => {
      let title = document.querySelectorAll('.title-text')[0] ? document.querySelectorAll('.title-text')[0].textContent : document.querySelectorAll('title')[0]
      title = title.replace('吉他教学', '').replace('/', '').trim()
      let imgNodes = document.querySelectorAll('.alignnone').length ? document.querySelectorAll('.alignnone') : document.querySelectorAll('.aligncenter')
      let imgUrls = Array.from(imgNodes).map((img) => {
        return img.src
      })
      return {
        title,
        imgUrls
      }
    })
    return result
  }
  return info
}

export function closeBrowser() {
  browser.close()
}