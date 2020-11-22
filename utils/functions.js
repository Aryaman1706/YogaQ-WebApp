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

exports.idIsPresent = async (arrayOfIds, id) => {
  let bool = false;
  for (let i = 0; i < arrayOfIds.lenght; i += 1) {
    if (arrayOfIds[i].equals(id)) {
      bool = true;
      break;
    }
  }
  return bool;
};
