const express = require('express');
const userRouter = require("./user");
const contactRouter = require("./contact");
const scheduleRouter = require("./schedule");

const router = express.Router();

router.use("/user", userRouter);
router.use("/contact", contactRouter);
router.use("/schedule", scheduleRouter);

module.exports = router;