// * Models
const { QuestionSet, Question, Response } = require("./models");

// * Utils
const validators = require("./validators");

// * Controllers -->

// * Toggle Active status of Question Set
exports.toggleActive = async (req, res) => {
  try {
    // Validating request body
    const { error, value } = validators.toggleActive(req.body);
    if (error)
      return res
        .status(404)
        .json({ error: error.details[0].message, body: null });

    // Finding valid questionSet
    const questionSet = await QuestionSet.findByIdAndUpdate(
      req.params.id,
      { ...value },
      { new: true }
    );
    if (!questionSet)
      return res
        .status(404)
        .json({ error: "Invalid Question Set.", body: null });

    return res.json({ error: null, body: questionSet });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.json({ error: "Server Error.", body: null });
  }
};

// * Add Question to question set
exports.addQues = async (req, res) => {
  try {
    const { error, value } = validators.addQuestion(req.body);
    if (error)
      return res
        .status(404)
        .json({ error: error.details[0].message, body: null });

    const questionSet = await QuestionSet.findById(req.params.id).exec();
    if (!questionSet)
      return res
        .status(404)
        .json({ error: "Invalid Question Set.", body: null });

    const newQuestion = await Question.create({
      questionSetId: questionSet._id,
      ...value,
    });
    questionSet.questions.push(newQuestion._id);
    await questionSet.save();

    return res.json({ error: null, body: "Question Added Successfully." });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.json({ error: "Server Error.", body: null });
  }
};

// * Remove and delete question from questionSet
exports.deleteQues = async (req, res) => {
  try {
    const question = await Question.findById(req.params._id).exec();
    if (!question) return res.json({ error: "Invalid Question.", body: null });

    await question.remove();
    return res.json({ error: null, body: "Question Deleted Successfully." });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.json({ error: "Server Error.", body: null });
  }
};

// * Get questionSet for user
exports.userGet = async (req, res) => {
  try {
    const questionSet = await QuestionSet.findById(req.user.questionSet)
      .populate("questions")
      .exec();
    if (!questionSet)
      return res
        .status(404)
        .json({ error: "Invalid Question Set.", body: null });

    return res.status(200).json({ error: null, body: questionSet });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.json({ error: "Server Error.", body: null });
  }
};

// * User fill questionSet
exports.userFill = async (req, res) => {
  try {
    const { error, value } = validators.fillSet(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    await Promise.all([
      Response.create({ ...value, questionSet: req.user.questionSet }),
      QuestionSet.findByIdAndUpdate(
        req.user.questionSet,
        {
          lastAnswered: new Date(),
        },
        { new: true }
      ),
    ]);

    return res.json({ error: null, body: "Response Submitted Successfully." });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.json({ error: "Server Error.", body: null });
  }
};

// * Get questionSet for doctor
exports.docGet = async (req, res) => {
  try {
    const questionSet = await QuestionSet.findById(req.params.id)
      .populate("questions")
      .exec();
    if (!questionSet)
      return res
        .status(404)
        .json({ error: "Invalid Question Set.", body: null });

    return res.status(200).json({ error: null, body: questionSet });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.json({ error: "Server Error.", body: null });
  }
};

// * Get filled questionSet for doctor datewise
exports.docFilled = async (req, res) => {
  try {
    const date = new Date(req.query.date);
    const questionSet = await QuestionSet.findById(req.params.id).populate({
      path: "responses",
      match: {
        date: {
          $gte: new Date(date.setHours(0, 0, 0)),
          $lte: new Date(date.setDate(date.getDate() + 1)),
        },
      },
    });
    if (!questionSet)
      return res
        .status(404)
        .json({ error: "Invalid Question Set", body: null });

    return res.status(200).json({ error: null, body: questionSet });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.json({ error: "Server Error.", body: null });
  }
};

// * End of Controllers -->
