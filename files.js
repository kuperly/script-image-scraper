const fs = require("fs");
const http = require("http");
const https = require("https");
const fsExtra = require("fs-extra");
const path = require("path");

const downloadImagesAndSaveToFile = async (directory, images) => {
  console.log("download images...");
  const imgDir = `${directory}/images`;

  // Delete old files
  fsExtra.emptyDirSync(imgDir);

  if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
  }

  for (let i = 0; i < images.length; i++) {
    const ext = path.extname(images[i].src);
    result = await download(images[i].src, `${imgDir}/image-${i}${ext}`);
  }

  console.log("download images end.");
};

const download = (url, destination) => {
  if (url.indexOf("data:") !== -1) {
    const ReadableData = require("stream").Readable;
    const imageBufferData = Buffer.from(url, "base64");
    const streamObj = new ReadableData();
    streamObj.push(imageBufferData);
    streamObj.push(null);
    streamObj.pipe(fs.createWriteStream(destination));
    return;
  } else {
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
  }
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
        console.log("Can't copy styles", err);
      }
    }
  );
};

module.exports = {
  downloadImagesAndSaveToFile,
  initDirectory,
  copyFilesToDirectory,
};
