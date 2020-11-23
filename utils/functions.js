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

exports.idIsPresent = (arrayOfIds, id) => {
  let bool = false;
  for (let i = 0; i < arrayOfIds.length; i += 1) {
    if (id.toString() === arrayOfIds[i].toString()) {
      bool = true;
      break;
    }
  }
  return bool;
};
