// * Convert an array of mongodb objectId to an array of stringd
exports.objectIdToStringArray = (array) => {
  return array.map((objectId) => {
    return objectId.str;
  });
};
