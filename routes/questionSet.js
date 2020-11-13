// * NPM Packages
const express = require("express");

// * Controllers

// * API Endpoints -->
const router = express.Router();

// * Toggle Active status of Question Set
router.put("/active/:id");

// * Add Question to question set
router.put("/addQuestion/:id");

// * Delete given Question
router.delete("/removeQuestion/:id");

// * Get Question Set (User)
router.get("/get");

// * Fill Question Set (User)
router.post("/fill");

// * Get Question Set (Doctor)
router.get("/doctor/get/:id");

// * Get Question Set with responses datewise
// /questionSet/doctor/fill/:id?date=(JS date)
router.get("/doctor/fill/:id");

// * End API Endpoints -->

module.exports = router;
