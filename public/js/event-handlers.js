function submitIdeaHandler(user) {
  let title = document.getElementById("comp-title").value;
  let body = document.getElementById("comp-body").value;
  let selectedCategories = document.getElementsByClassName(
    "comp-categories comp-categories-selected"
  );

  let selectedCategoriesArray = [];

  for (let i = 0; i < selectedCategories.length; i++) {
    categoryName = selectedCategories[i].innerHTML;
    selectedCategoriesArray.push(categoryName);
  }

  let timestamp = new Date();
  let creator_alias;
  let creator_id;
  let creator_color;

  if (user._id !== undefined) {
    creator_alias = user.adjective;
    creator_id = user._id;
    creator_color = user.color;
  } else {
    creator_alias = "Anon";
    creator_id = "anon id";
    creator_color = "pink";
  }
  const data = {
    title: title,
    body: body,
    categories: selectedCategoriesArray,
    timestamp: timestamp,
    creator_id: creator_id,
    creator_color: creator_color,
    creator_alias: creator_alias,
    votes: 0,
    final_comment: null,
    final_side: null
  };

  if (title != "" && body != "") {
    post("/api/idea", data, function(ideaObj) {
      let ideaDiv = document.getElementById("feed");
      ideaDiv.prepend(ideaDOMObject(ideaObj, user));
    });
    closeComposer();
  }
}

function checkIfVoted(comment_id, user) {
  let alreadyLiked = false;
  let likedComments = user.liked_comments;
  for (let i = 0; i < likedComments.length; i++) {
    if (comment_id === likedComments[i]) {
      alreadyLiked = true;
    }
  }
  return alreadyLiked;
}

function submitCommentHandler(idea_id, yes_or_no, user) {
  let inputField = document.getElementById(
    "comment-field-" + yes_or_no + idea_id
  );
  let body = inputField.value;
  if (body.length > 0) {
    let timestamp = new Date();
    let creator_alias;
    let creator_id;
    let creator_color;

    if (user._id !== undefined) {
      creator_alias = user.adjective;
      creator_id = user._id;
      creator_color = user.color;
    } else {
      creator_alias = "Anon";
      creator_id = "anon id";
      creator_color = "pink";
    }
    const data = {
      timestamp: timestamp,
      body: body,
      yes_or_no: yes_or_no,
      parent_id: idea_id,
      creator_id: creator_id,
      creator_color: creator_color,
      creator_alias: creator_alias,
      votes: 0
    };
    inputField.value = "";
    post("/api/comment", data, function(newComment) {
      if (yes_or_no === "yes") {
        yesDiv = document.getElementById("comments-yes" + idea_id);
        if (yesDiv.children[0].className === "empty-div-yes") {
          yesDiv.innerHTML = "";
        }
        yesDiv.prepend(commentDOMObject(newComment, user));
      } else {
        noDiv = document.getElementById("comments-no" + idea_id);
        if (noDiv.children[0].className === "empty-div-no") {
          noDiv.innerHTML = "";
        }
        noDiv.prepend(commentDOMObject(newComment, user));
      }
    });
  }
}

function commentVoteHandler(comment_id, idea_id, yes_or_no, user) {
  console.log("vote handler for: " + comment_id);
  let heartButton = document.getElementById("comment-vote" + comment_id);
  let heartCount = document.getElementById("vote-count" + comment_id);

  if (user !== undefined) {
    get("/api/userById", { _id: user._id }, function(userObj) {
      let alreadyLiked = checkIfVoted(comment_id, userObj);

      if (alreadyLiked === false) {
        post("/api/addVoteToComment", { _id: comment_id }, function(c) {
          post(
            "/api/addCommentToUser",
            { _id: userObj._id, comment_id: comment_id },
            function(d) {
              console.log("you just liked this " + comment_id);
              heartButton.className = "vote-button voted";
              heartCount.innerText = parseInt(heartCount.innerText) + 1;
              if (yes_or_no === "yes") {
                updateIdeaVotesYes(idea_id, "add");
              } else {
                updateIdeaVotesNo(idea_id, "add");
              }
            }
          );
        });
      } else {
        console.log("already liked, sorry");
        post("/api/subtractVoteFromComment", { _id: comment_id }, function(c) {
          post(
            "/api/removeCommentFromUser",
            { _id: userObj._id, comment_id: comment_id },
            function(d) {
              console.log("you just unliked this " + comment_id);
              heartButton.className = "vote-button";
              heartCount.innerText = parseInt(heartCount.innerText) - 1;
              if (yes_or_no === "yes") {
                updateIdeaVotesYes(idea_id, "subtract");
              } else {
                updateIdeaVotesNo(idea_id, "subtract");
              }
            }
          );
        });
      }
    });
  }
}

function renderWhaleProfile() {
  let whaleName = document.getElementById("whale-name");
  let realName = document.getElementById("real-name");

  get("/api/whoami", {}, function(user) {
    whaleName.innerHTML = user.adjective + " " + user.color;
    realName.innerHTML = user.name;
    console.log(user.adjective);
  });
}

function submitUpdateHandler(idea) {
  let final_comment = document.getElementById("update-comp-body").value;
  let final_side = document
    .getElementsByClassName("final-update-selected")[0]
    .innerText.toLowerCase();

  if (final_side !== null && final_comment.length > 0) {
    post(
      "/api/closeIdea",
      { _id: idea._id, final_comment: final_comment, final_side: final_side },
      function(idea) {
        console.log(idea);
      }
    );

    console.log(idea._id + " update was made");
    closeUpdateComposer();

    const finalUpdate = document.getElementById("final-update" + idea._id);
    finalUpdate.className = "final-update";

    finalUpdateHeader = document.createElement("div");
    finalUpdateHeader.className = "final-update-header";
    finalUpdateTitle = document.createElement("div");
    finalUpdateTitle.className = "bold-section-title";
    finalUpdateTitle.innerHTML = "FINAL DECISION";

    finalUpdateHeader.append(finalUpdateTitle);
    finalUpdateHeader.append(finalUpdateBadgeDOMObject(final_side));

    finalUpdate.append(finalUpdateHeader);

    finalUpdateBadge = document.createElement("div");

    finalUpdateThumb = document.createElement("div");
    finalUpdateThumb.className = "comment-thumb";
    finalUpdateThumb.style.backgroundColor = returnUserColorHex(
      null,
      idea.creator_color
    );

    finalUpdate.append(finalUpdateThumb);

    finalUpdateText = document.createElement("div");
    finalUpdateText.className = "final-update-text";
    finalUpdateText.id = "final-update-text" + idea._id;
    finalUpdateText.innerHTML =
      "<span class='bold'>" +
      idea.creator_alias +
      " Whale</span> " +
      final_comment;
    finalUpdate.append(finalUpdateText);

    updateStatusBadge(idea._id, 0, 0, (active = false));

    commentFieldYes = document.getElementById("comment-field-yes" + idea._id);
    commentFieldNo = document.getElementById("comment-field-no" + idea._id);

    commentFieldYes.placeholder = "Idea is now closed";
    commentFieldYes.disabled = true;
    commentFieldYes.classList.add("disabled-field");

    commentFieldNo.placeholder = "Idea is now closed";
    commentFieldNo.disabled = true;
    commentFieldNo.classList.add("disabled-field");

    submitCommentYes = document.getElementById(
      "submit-comment-yes-" + idea._id
    );
    submitCommentNo = document.getElementById("submit-comment-no-" + idea._id);
    submitCommentYes.classList.add("disabled-button");
    submitCommentNo.classList.add("disabled-button");

    document.getElementById("close" + idea._id).style.display = "none";
  }
}
