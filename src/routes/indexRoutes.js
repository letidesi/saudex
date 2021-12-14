const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    title: " API Saudex",
    version: " 1.0.0",
    message_of_intention: " Designed to help dibetic people.",
    message_welcome: " We welcome you :) ",
    message_of_support: " We're with you!",
  });
});

module.exports = router;
