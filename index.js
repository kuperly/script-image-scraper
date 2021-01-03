const files = require("./files");
const htmlHandle = require("./htmlHandle");
const browserObject = require("./browser");

const init = async (url, output) => {
  // CreateProject directory
  const processPath = `${output}/image-scraper-app`;
  files.initDirectory(processPath);

  let images = await browserObject.getImagesFromURL(url);

  await files.downloadImagesAndSaveToFile(processPath, images);
  await htmlHandle.buildHtml(processPath, images);
  await files.copyFilesToDirectory(processPath);
  await browserObject.openInBrowser(processPath);
};

module.exports = {
  init,
};
