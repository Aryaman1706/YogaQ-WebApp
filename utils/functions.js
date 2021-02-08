// * Convert an array of mongodb objectId to an array of strings
exports.objectIdToStringArray = (array) => {
  return array.map((objectId) => objectId.toString());
};
