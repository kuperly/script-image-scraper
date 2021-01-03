const fs = require("fs");
const fsExtra = require("fs-extra");
let ejs = require("ejs");
const path = require("path");

const buildHtml = async (directory, imagesObj) => {
  console.log("Start building HTML...");
  const imgDir = `${directory}/images`;

  const imgs = fs.readdirSync(imgDir);

  await ejs.renderFile(
    path.join(__dirname, "./index.ejs"),
    { images: imgs, imgObj: imagesObj },
    async (err, str) => {
      await fs.writeFile("index.html", str, (err) => {});
    }
  );

  // Copy to directory
  await fsExtra.copy(
    path.resolve(__dirname, "./index.html"),
    `${directory}/index.html`
  );

  console.log("Building HTML end.");
};

module.exports = {
  buildHtml,
};
