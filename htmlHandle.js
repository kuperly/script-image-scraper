const fs = require("fs");
const fsExtra = require("fs-extra");
let ejs = require("ejs");
const path = require("path");

const buildHtml = async (directory) => {
  const imgDir = `${directory}/images`;

  const imgs = fs.readdirSync(imgDir);

  await ejs.renderFile(
    path.join(__dirname, "./index.ejs"),
    { images: imgs },
    async (err, str) => {
      await fs.writeFile("index.html", str, (err) => {});
    }
  );

  // Copy to directory
  await fsExtra.copy(
    path.resolve(__dirname, "./index.html"),
    `${directory}/index.html`
  );
};

module.exports = {
  buildHtml,
};
