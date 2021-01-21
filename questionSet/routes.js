const express = require("express");

// * Controllers
const controller = require("./controllers");

// * API Endpoints -->
const router = express.Router();

// * Toggle Active status of Question Set
// id -> QuestionSet._id
router.put("/active/:id", controller.toggleActive);

// * Add Question to question set
// id -> QuestionSet._id
router.put("/addQuestion/:id", controller.addQues);

// * Delete given Question
// id -> Question._id
router.delete("/removeQuestion/:id", controller.deleteQues);

// * Get Question Set (User)
router.get("/get", controller.userGet);

// * Fill Question Set (User)
router.post("/fill", controller.userFill);

// * Get Question Set (Doctor)
// id -> questionSet._id
router.get("/doctor/get/:id", controller.docGet);

// * Get Question Set with responses datewise
// /questionSet/doctor/fill/:id?date=(JS date), id -> questionSet._id
router.get("/doctor/fill/:id", controller.docFilled);

// * End API Endpoints -->

module.exports = router;
