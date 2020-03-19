const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.sendFile("index.html", { root: "src/views" });
});

router.get("/activity", function(req, res) {
  res.sendFile("activity.html", { root: "src/views" });
});

router.get("/signin", function(req, res) {
  res.sendFile("signin.html", { root: "src/views" });
});

module.exports = router;
