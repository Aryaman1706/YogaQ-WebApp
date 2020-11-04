exports.getUri = (stream, file) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.setEncoding("base64");
    stream.on("readable", () => {
      let chunk;
      while ((chunk = stream.read()) !== null) {
        chunks.push(chunk);
      }
    });
    stream.on("end", () => {
      const uri = `data:${file.mimetype};base64,${chunks.join("")}`;
      resolve(uri);
    });
    stream.on("error", () => {
      reject();
    });
  });
};
