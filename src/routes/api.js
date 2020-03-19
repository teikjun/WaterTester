// dependencies
const express = require("express");
//const connect = require('connect-ensure-login');

// models
const Idea = require("../models/idea");
const Comment = require("../models/comment");
const User = require("../models/user");

const router = express.Router();

// api endpoints
// /whoami route returns the user
router.get("/whoami", function(req, res) {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.send({});
  }
});

router.get("/userById", function(req, res) {
  User.findById({ _id: req.query._id }, function(err, user) {
    res.send(user);
  });
});

router.post("/updateUserName", function(req, res) {
  User.findById({ _id: req.body._id }, function(err, currentUser) {
    if (err) console.log(err);
    currentUser.adjective = req.body.adjective;
    currentUser.color = req.body.color;

    currentUser.save(function(err, updatedUser) {
      if (err) console.log(err);
    });
  });
  res.send({});
});

router.post("/addCommentToUser", function(req, res) {
  User.findById({ _id: req.body._id }, function(err, currentUser) {
    if (err) console.log(err);
    let newArray = currentUser.liked_comments;
    newArray.push(req.body.comment_id);
    currentUser.liked_comments = newArray;

    currentUser.save(function(err, updatedUser) {
      if (err) console.log(err);
    });
  });
  res.send({});
});

router.post("/removeCommentFromUser", function(req, res) {
  console.log("removing comment");
  User.findById({ _id: req.body._id }, function(err, currentUser) {
    if (err) console.log(err);
    let newArray = currentUser.liked_comments;
    console.log("liked comments: ");
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i] === req.body.comment_id) {
        console.log("found: " + newArray[i]);
        newArray.splice(i, 1);
        console.log("removed, now array is:");
        console.log(newArray);
      }
    }
    currentUser.liked_comments = newArray;

    currentUser.save(function(err, updatedUser) {
      if (err) console.log(err);
    });
  });
  res.send({});
});

// Ideas:
router.get("/ideas", function(req, res) {
  Idea.find({}, function(err, ideas) {
    res.send(ideas);
  });
});

router.get("/idea", function(req, res) {
  Idea.findOne({ _id: req.query._id }, function(err, idea) {
    res.send(idea);
  });
});

router.post("/idea", function(req, res) {
  const newIdea = new Idea({
    creator_id: req.body.creator_id,
    creator_color: req.body.creator_color,
    creator_alias: req.body.creator_alias,
    timestamp: req.body.timestamp,
    categories: req.body.categories,
    title: req.body.title,
    body: req.body.body,
    active: true,
    votes_yes: 0,
    votes_no: 0,
    final_comment: req.body.final_comment,
    final_side: req.body.final_side
  });
  newIdea.save(function(err, idea) {
    if (err) console.log(err);
    res.send(newIdea);
  });
});

router.post("/updateIdeaVotes", function(req, res) {
  Idea.findById({ _id: req.body._id }, function(err, currentIdea) {
    currentIdea.votes_no = req.body.votes_no;
    currentIdea.votes_yes = req.body.votes_yes;

    currentIdea.save(function(err, updatedIdea) {
      if (err) console.log(err);
    });
  });
  res.send({});
});

// COMMENTS
router.get("/comments", function(req, res) {
  Comment.find({ parent_id: req.query.parent_id }, function(err, comments) {
    res.send(comments);
  });
});

router.post("/comment", function(req, res) {
  const newComment = new Comment({
    creator_id: req.body.creator_id,
    creator_alias: req.body.creator_alias,
    creator_color: req.body.creator_color,
    timestamp: req.body.timestamp,
    body: req.body.body,
    yes_or_no: req.body.yes_or_no,
    votes: 0,
    parent_id: req.body.parent_id
  });
  newComment.save(function(err, comment) {
    if (err) console.log(err);
    res.send(newComment);
  });
});

router.post("/addVoteToComment", function(req, res) {
  Comment.findById({ _id: req.body._id }, function(err, currentComment) {
    if (err) console.log(err);
    currentComment.votes = currentComment.votes + 1;
    currentComment.save(function(err, updatedComment) {
      if (err) console.log(err);
    });
  });
  res.send({});
});

router.post("/deleteComments", function(req, res) {
  Idea.deleteMany({}, function() {});
  res.send({});
});

router.post("/subtractVoteFromComment", function(req, res) {
  Comment.findById({ _id: req.body._id }, function(err, currentComment) {
    if (err) console.log(err);
    currentComment.votes = currentComment.votes - 1;
    currentComment.save(function(err, updatedComment) {
      if (err) console.log(err);
    });
  });
  res.send({});
});

//Update
//{ _id: idea._id, final_comment: final_comment, final_side: final_side }
router.post("/closeIdea", function(req, res) {
  Idea.findById({ _id: req.body._id }, function(err, currentIdea) {
    currentIdea.active = false;
    currentIdea.final_comment = req.body.final_comment;
    currentIdea.final_side = req.body.final_side;

    currentIdea.save(function(err, updatedIdea) {
      if (err) console.log(err);
    });
  });
  res.send({});
});

module.exports = router;
