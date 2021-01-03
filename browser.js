const puppeteer = require("puppeteer");
const open = require("open");

const startBrowser = async () => {
  let browser;
  try {
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

  // Getting all images src that not base64
  const imagesUrl = await page.evaluate(() => {
    return Array.from(document.images, (e) => {
      return { src: e.src, size: e.size, width: e.width, alt: e.alt };
    })
      .filter((e) => e.src.length && e.width >= 120)
      .slice(0, 100);
  });

  await browser.close();

  return imagesUrl;
};

module.exports = {
  startBrowser,
  openInBrowser,
  getImagesFromURL,
};
