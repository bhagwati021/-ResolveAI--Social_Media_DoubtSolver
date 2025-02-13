const express = require("express");
const { submitDoubt, getAllDoubts } = require("../controllers/doubtController");

const router = express.Router();

router.post("/submit-doubt", submitDoubt);
router.get("/all-doubts", getAllDoubts);

module.exports = router;
