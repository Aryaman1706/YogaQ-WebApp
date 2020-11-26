const puppeteer = require("puppeteer");

const getEmbeds = async (link) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(link, { waitUntil: "domcontentloaded" });
    await page.setRequestInterception(true);
    // page.on("request", (request) => {
    //   request.abort();
    // });
    const [title, description, image] = await Promise.all([
      await page.$eval(
        "meta[name=title], meta[property='og:title'], meta[name='twitter:title']",
        (data) => data.content
      ),
      await page.$eval(
        "meta[name=description], meta[property='og:description'], meta[name='twitter:description']",
        (data) => data.content
      ),
      await page.$eval(
        "meta[name=image], meta[property='og:image'], meta[name='twitter:image']",
        (data) => data.content
      ),
    ]);
    await browser.close();
    return { title, description, image };
  } catch (error) {
    console.log(error);
    return { title: null, description: null, image: null };
  }
};
module.exports = getEmbeds;
