const fs = require("fs");
const http = require("http");
const https = require("https");
const fsExtra = require("fs-extra");

const downloadImagesAndSaveToFile = async (directory, images) => {
  const imgDir = `${directory}/images`;

  // Delete old files
  fsExtra.emptyDirSync(imgDir);

  if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
  }

  for (let i = 0; i < images.length; i++) {
    result = await download(images[i], `${imgDir}/image-${i}.png`);
  }
};

const download = (url, destination) => {
  const proto = !url.charAt(4).localeCompare("s") ? https : http;
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    proto
      .get(url, (response) => {
        response.pipe(file);

        file.on("finish", () => {
          file.close(resolve(true));
        });
      })
      .on("error", (error) => {
        fs.unlink(destination);

        reject(error.message);
      });
  });
};

const initDirectory = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

const copyFilesToDirectory = async (directory) => {
  await fs.copyFile(
    `${__dirname}/style.css`,
    `${directory}/style.css`,
    (err) => {
      if (err) {
        console.log("error", err);
      }
    }
  );
};

module.exports = {
  downloadImagesAndSaveToFile,
  initDirectory,
  copyFilesToDirectory,
};
