const cloudinary = require("./cloudinaryConfig");
const { getUri } = require("../utils/functions");

function CustomStorage() {}

CustomStorage.prototype._handleFile = function _handleFile(req, file, cb) {
  console.log(file);
  getUri(file.stream, file)
    .then((uri) => {
      console.log(uri.slice(0, 50));
      cloudinary.uploader
        .unsigned_upload(uri, process.env.CLOUDINARY_UNSIGNED_NAME)
        .then((result) => {
          cb(null, { url: result.secure_url });
        })
        .catch((err) => {
          console.log("Error multer\n", err);
          cb(err);
        });
    })
    .catch(() => {
      cb("Failed to read file.");
    });
};

module.exports = function () {
  return new CustomStorage();
};
