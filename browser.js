const puppeteer = require("puppeteer");
const open = require("open");

const startBrowser = async () => {
  let browser;
  try {
    console.log("Opening the browser......");
    browser = await puppeteer.launch({
      headless: true,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }
  return browser;
};

const openInBrowser = async (directory) => {
  await open(`${directory}/index.html`, { wait: false }).catch(() => {
    console.log("Failed to open browser");
  });
};

const getImagesFromURL = async (url) => {
  const browser = await startBrowser();
  const page = await browser.newPage();
  await page.goto(url);

  // Getting all images src
  const imagesUrl = await page.evaluate(() =>
    Array.from(document.images, (e) => e.src)
  );

  await browser.close();

  return imagesUrl;
};

module.exports = {
  startBrowser,
  openInBrowser,
  getImagesFromURL,
};
