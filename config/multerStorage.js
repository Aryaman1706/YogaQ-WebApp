const fs = require("fs");
const zlib = require("zlib");

const getDestination = (req, file, cb) => {
  cb(null, "/dev/null");
};

function CustomStorage(opts) {
  this.getDestination = opts.destination || getDestination;
}

CustomStorage.prototype._handleFile = function _handleFile(req, file, cb) {
  this.getDestination(req, file, (err, path) => {
    if (err) return cb(err);

    const gzip = zlib.createGzip();
    const outStream = fs.createWriteStream(path);
    file.stream.pipe(gzip).pipe(outStream);

    gzip.on("error", cb);
    outStream.on("error", cb);
    outStream.on("finish", () => {
      cb(null, { path: path });
    });
    return cb;
  });
};

CustomStorage.prototype._removeFile = function _removeFile(req, file, cb) {
  fs.unlink(file.path, cb);
};

module.exports = function (opts) {
  return new CustomStorage(opts);
};
