// * Models
const Link = require("./models");

// * Utils
const validators = require("./validators");

// * Controllers -->

// * Create new Link document
exports.create = async (req, res) => {
  try {
    // Forming valid req.body
    const body = {
      ...req.body,
      links: JSON.parse(req.body.links),
    };

    // Validating req.body
    const { error, value } = validators.createOrEdit(body);
    if (error)
      return res.status(400).json({
        error: `Validation Error. ${error.details[0].message}`,
        body: null,
      });

    // Create a map of all files
    const fileMap = {};
    req.files.forEach((file) => {
      fileMap[file.fieldname] = file;
    });

    // Map files to corresponding urls
    value.links = value.links.map((obj) => ({
      url: obj.url,
      thumbnail: fileMap[obj.thumbnail].downloadUrl,
    }));

    // Create new document
    await Link.create({ ...value });

    return res.status(200).json({
      error: null,
      body: "New Link document created successfully.",
    });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Edit Link document

// * Delete Link document

// * Get all Link documents

// * Get enabled link document

// * End of Controllers -->
