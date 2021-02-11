// * Models
const { QuestionSet, Question, Response } = require("./models");
const {
  models: { Chatroom },
} = require("../chatroom");

// * Utils
const validators = require("./validators");

// * Controllers -->

// * Create new questionSet for chatroom
exports.create = async (req, res) => {
  try {
    // Validating request body
    const { error, value } = validators.create(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    // Validating chatroom and questionSet
    const [chatroom, questionSet] = await Promise.all([
      Chatroom.findById(value.chatroomId).exec(),
      QuestionSet.findOne({ chatroomId: value.chatroomId }).exec(),
    ]);
    if (!chatroom)
      return res.status(400).json({ error: "Chatroom not found.", body: null });
    if (questionSet)
      return res
        .status(400)
        .json({ error: "Question set already exists.", body: null });

    // Creating new questionSet
    await QuestionSet.create({
      chatroomId: chatroom._id,
      active: true,
    });

    return res
      .status(200)
      .json({ error: null, body: "New Question Set created." });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Toggle Active status of Question Set
exports.toggleActive = async (req, res) => {
  try {
    // Validating request body
    const { error, value } = validators.toggleActive(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    // Finding valid questionSet
    const questionSet = await QuestionSet.findByIdAndUpdate(
      req.params.id,
      { ...value },
      { new: true }
    );
    if (!questionSet)
      return res
        .status(400)
        .json({ error: "Invalid Question Set.", body: null });

    return res
      .status(200)
      .json({ error: null, body: "Changes saved successfully." });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Add Question to question set
exports.addQues = async (req, res) => {
  try {
    // Validating request body
    const { error, value } = validators.addQuestion(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    // Finding valid questionSet
    const questionSet = await QuestionSet.findById(req.params.id).exec();
    if (!questionSet)
      return res
        .status(400)
        .json({ error: "Invalid Question Set.", body: null });

    // If doctor is logged in then verifying access to chatroom
    if (
      req.user.role.trim() === "doctor" &&
      (!req.activeChatroom ||
        !questionSet.chatroomId.equals(req.activeChatroom))
    )
      return res.status(401).json({ error: "Permission Denied.", body: null });

    // Creating new question
    const newQuestion = await Question.create({
      questionSetId: questionSet._id,
      ...value,
    });

    // Storing and saving new question
    questionSet.questions.push(newQuestion._id);
    questionSet.markModified("questions");
    await questionSet.save();

    return res
      .status(200)
      .json({ error: null, body: "Question Added Successfully." });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};
// ! TODO
// * Remove and delete question from questionSet
exports.deleteQues = async (req, res) => {
  try {
    // Finding and deleting question
    const question = await Question.findById(req.params.id).exec();
    if (!question)
      return res.status(400).json({ error: "Invalid Question.", body: null });

    // Remove question
    await question.remove();
    return res
      .status(200)
      .json({ error: null, body: "Question Deleted Successfully." });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Get questionSet for user
exports.userGet = async (req, res) => {
  try {
    // Finding and populating valid questionSet
    const questionSet = await QuestionSet.findOne({
      chatroomId: req.activeChatroom.chatroomId,
    })
      .populate("questions")
      .exec();
    if (!questionSet)
      return res
        .status(400)
        .json({ error: "Invalid Question Set.", body: null });

    return res.status(200).json({ error: null, body: questionSet });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * User fill questionSet
exports.userFill = async (req, res) => {
  try {
    // Validating request body
    const { error, value } = validators.fillSet(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    // Finding valid questionSet
    const questionSet = await QuestionSet.findOne({
      chatroomId: req.activeChatroom.chatroomId,
    }).exec();
    if (!questionSet)
      return res.status(400).json({ error: "Invalid request.", body: null });

    // Getting lastAnswered
    const lastAnswered = new Date(questionSet.lastAnswered);
    // End of day
    lastAnswered.setHours(23, 59, 59);
    // Verifying that one day has passed
    if (new Date() < lastAnswered)
      return res.status(400).json({
        error: "Response already submitted. Try again tomorrow.",
        body: null,
      });

    // Storing new lastAnswered
    questionSet.lastAnswered = new Date();

    // Creating responses and saving new details to questionSet
    await Promise.all([
      Response.create({ ...value, questionSet: questionSet._id }),
      questionSet.save(),
    ]);

    return res
      .status(200)
      .json({ error: null, body: "Response Submitted Successfully." });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Get questionSet for doctor
exports.docGet = async (req, res) => {
  try {
    // Finding valid questionSet
    const questionSet = await QuestionSet.findOne({
      chatroomId: req.activeChatroom.chatroomId,
    })
      .populate("questions")
      .exec();
    if (!questionSet)
      return res
        .status(400)
        .json({ error: "Invalid Question Set.", body: null });

    return res.status(200).json({ error: null, body: questionSet });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Get filled questionSet for doctor datewise
exports.docFilled = async (req, res) => {
  try {
    // Validating request query
    const { error, value } = validators.date(req.query);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    // Create new date
    const date = new Date(value.date);

    // Finding valid questionSet
    const questionSet = await QuestionSet.findById(req.params.id).populate({
      path: "responses",
      match: {
        // ! Verify this
        date: {
          $gte: new Date(date.setHours(0, 0, 0)),
          $lte: new Date(date.setDate(date.getDate() + 1)),
        },
      },
    });
    if (!questionSet)
      return res
        .status(400)
        .json({ error: "Invalid Question Set", body: null });

    return res.status(200).json({ error: null, body: questionSet });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * End of Controllers -->
