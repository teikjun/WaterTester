// RELATIVE TIMESTAMP
function timeSince(timeStamp) {
  var now = new Date(),
    secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  if (secondsPast < 60) {
    return parseInt(secondsPast) + "s" + " ago";
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + "m" + " ago";
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + "h" + " ago";
  }
  if (secondsPast > 86400) {
    day = timeStamp.getDate();
    month = timeStamp
      .toDateString()
      .match(/ [a-zA-Z]*/)[0]
      .replace(" ", "");
    year =
      timeStamp.getFullYear() == now.getFullYear()
        ? ""
        : " " + timeStamp.getFullYear();
    return day + " " + month + year;
  }
}

function openUpdateComposer(idea) {
  document.getElementById("update-composer").style.display = "block";
  document
    .getElementById("update-post-button")
    .addEventListener("click", function () {
      submitUpdateHandler(idea);
    });
  document.getElementById("current-title").innerText = idea.title;
  document.getElementById("current-body").innerText = idea.body;
}

function closeIdeaBannerDOMObject(idea) {
  let closeIdeaBanner = document.createElement("div");
  closeIdeaBanner.className = "close-idea-banner";

  closeIdeaText = document.createElement("div");
  closeIdeaText.className = "close-idea-text";
  closeIdeaText.innerText =
    "You posted this " +
    timeSince(new Date(idea.timestamp)) +
    ". Would you like to post an update on your progress?";
  closeIdeaBanner.append(closeIdeaText);

  closeIdeaButton = document.createElement("div");
  closeIdeaButton.className = "close-idea-button";
  closeIdeaButton.id = "close" + idea._id;
  closeIdeaButton.innerText = "Update";

  closeIdeaButton.addEventListener("click", function () {
    openUpdateComposer(idea);
  });
  closeIdeaBanner.append(closeIdeaButton);

  return closeIdeaBanner;
}

function finalUpdateBadgeDOMObject(yes_or_no) {
  const finalUpdateBadge = document.createElement("div");
  if (yes_or_no === "yes") {
    finalUpdateBadge.style.backgroundColor = "#49E4A9";
    finalUpdateBadge.innerText = "YES";
  } else {
    finalUpdateBadge.style.backgroundColor = "#FB6B7B";
    finalUpdateBadge.innerText = "NO";
  }
  finalUpdateBadge.className = "final-update-badge";
  return finalUpdateBadge;
}

function finalUpdateDOMObjDummy(ideaJSON, user) {
  const finalUpdate = document.createElement("div");
  finalUpdate.id = "final-update" + ideaJSON._id;
  return finalUpdate;
}

function finalUpdateDOMObject(ideaJSON, user) {
  const finalUpdate = document.createElement("div");
  finalUpdate.className = "final-update";
  finalUpdate.id = "final-update" + ideaJSON._id;

  finalUpdateHeader = document.createElement("div");
  finalUpdateHeader.className = "final-update-header";
  finalUpdateTitle = document.createElement("div");
  finalUpdateTitle.className = "bold-section-title";
  finalUpdateTitle.innerHTML = "FINAL DECISION";

  finalUpdateHeader.append(finalUpdateTitle);
  finalUpdateHeader.append(finalUpdateBadgeDOMObject(ideaJSON.final_side));

  finalUpdate.append(finalUpdateHeader);

  finalUpdateBadge = document.createElement("div");

  finalUpdateThumb = document.createElement("div");
  finalUpdateThumb.className = "comment-thumb";
  finalUpdateThumb.style.backgroundColor = returnUserColorHex(
    null,
    ideaJSON.creator_color
  );

  finalUpdate.append(finalUpdateThumb);

  finalUpdateText = document.createElement("div");
  finalUpdateText.className = "final-update-text";
  finalUpdateText.id = "final-update-text" + ideaJSON._id;
  finalUpdateText.innerHTML =
    "<span class='bold'>" +
    ideaJSON.creator_alias +
    " Whale</span> " +
    ideaJSON.final_comment;
  finalUpdate.append(finalUpdateText);

  return finalUpdate;
}

// ----------------------- IDEAS -----------------------
function ideaDOMObject(ideaJSON, user, meta = true) {
  // d-container
  const newIdea = document.createElement("div");
  newIdea.setAttribute("id", ideaJSON._id);
  newIdea.className = "d-container";

  let newDCardCompact = document.createElement("div");

  // d-card-expanded -- within d-container
  let newDCardExpanded = document.createElement("div");
  newDCardExpanded.className = "d-card-expanded";
  let expanded = false;
  newIdea.appendChild(newDCardExpanded);

  newDCardExpanded.setAttribute("id", "expand-footer-" + ideaJSON._id);

  // ------------------Close idea banner ---------------
  if (
    user._id === ideaJSON.creator_id &&
    ideaJSON.active === true &&
    ideaJSON.votes_no + ideaJSON.votes_yes >= 3
  ) {
    let closeBanner = closeIdeaBannerDOMObject(ideaJSON);
    closeBanner.id = "close" + ideaJSON._id;
    newDCardExpanded.append(closeBanner);
  }

  const dCardStatus = document.createElement("div");
  dCardStatus.className = "d-card-status";
  dCardStatus.id = "d-card-status" + ideaJSON._id;
  newDCardCompact.appendChild(dCardStatus);

  // ----------------------------- do status badge ---------------------------

  const statusBadge = document.createElement("div");
  statusBadge.className = "status-badge";
  let statusBadgePercent;

  const statusText = document.createElement("div");
  statusText.className = "status-text";

  let yes_votes = ideaJSON.votes_yes;
  let no_votes = ideaJSON.votes_no;

  if (yes_votes > no_votes) {
    statusBadgePercent = yes_votes / (yes_votes + no_votes);
    statusBadge.classList.add("status-badge-yes");
    statusBadge.innerText = "GOOD";
  } else if (yes_votes === no_votes && yes_votes !== 0) {
    statusBadgePercent = 0.5;
    statusText.innerText = "tied!";
    statusBadge.classList.add("status-badge-tied");
    statusBadge.innerText = "";
  } else {
    statusBadgePercent = no_votes / (yes_votes + no_votes);
    statusBadge.classList.add("status-badge-no");
    statusBadge.innerText = "BAD";
  }
  if ((yes_votes === 0) & (no_votes === 0)) {
    statusText.innerText = "no votes yet!";
    statusBadge.innerText = "NEW";
    statusBadge.classList.add("status-badge-tied");
  }
  statusBadgePercent = Math.floor(statusBadgePercent * 100);

  if (ideaJSON.active === false) {
    statusBadge.innerText = "CLOSED";
    statusBadge.style.backgroundColor = "#E1E8ED";
    statusText.innerText = "";
  } else if (!isNaN(statusBadgePercent)) {
    statusBadge.innerText = statusBadgePercent + "% " + statusBadge.innerText;
  }

  dCardStatus.appendChild(statusBadge);
  dCardStatus.appendChild(statusText);

  // --------------------------- do categories --------------------------------
  const dCardCategories = document.createElement("div");
  dCardCategories.className = "d-card-categories";
  for (let i = 0; i < ideaJSON.categories.length; i++) {
    let dCardCat = document.createElement("span");
    dCardCat.className = "d-card-cat";
    dCardCat.innerText = ideaJSON.categories[i];

    if (i === ideaJSON.categories.length - 1) {
      dCardCategories.appendChild(dCardCat);
    } else {
      dCardCategories.appendChild(dCardCat);
      const dot = document.createElement("span");
      dot.innerText = " · ";
      dCardCategories.appendChild(dot);
    }
    dCardCat.addEventListener("click", function () {
      renderFeedByCategory(user, ideaJSON.categories[i]);
      let categoriesArr = document.getElementsByClassName("feed-cat");
      for (let j = 0; j < categoriesArr.length; j++) {
        if (categoriesArr[j].innerText === ideaJSON.categories[i]) {
          categoriesArr[j].className = "feed-cat category-selected";
        } else {
          categoriesArr[j].className = "feed-cat";
        }
      }
    });
  }
  newDCardCompact.appendChild(dCardCategories);

  const dCardTitle = document.createElement("div");
  dCardTitle.className = "d-card-title";
  dCardTitle.innerText = ideaJSON.title;
  newDCardCompact.appendChild(dCardTitle);

  if (meta) {
    const dMeta = document.createElement("div");
    dMeta.className = "d-meta";
    newDCardCompact.appendChild(dMeta);
    const dThumbnail = document.createElement("div");
    dThumbnail.className = "d-thumbnail";
    dThumbnail.style.backgroundColor = returnUserColorHex(
      null,
      ideaJSON.creator_color
    );

    dMeta.appendChild(dThumbnail);

    const dMetaInfo = document.createElement("div");
    dMetaInfo.className = "d-meta-info";
    dMeta.appendChild(dMetaInfo);

    const dCreator = document.createElement("div");
    dCreator.className = "d-creator";
    dCreator.innerText = ideaJSON.creator_alias + " Whale";
    dMetaInfo.appendChild(dCreator);

    const dTimestamp = document.createElement("div");
    dTimestamp.className = "d-timestamp";
    if (ideaJSON.timestamp != null) {
      dTimestamp.innerHTML =
        "Posted " + timeSince(new Date(ideaJSON.timestamp));
    }

    if (ideaJSON.active === true && ideaJSON.creator_id === user._id) {
      const closeMetaButton = document.createElement("span");
      closeMetaButton.className = "d-card-cat";
      closeMetaButton.innerText = " · Update";
      closeMetaButton.addEventListener("click", function () {
        openUpdateComposer(ideaJSON);
      });
      dTimestamp.appendChild(closeMetaButton);
    }
    dMetaInfo.appendChild(dTimestamp);
  }

  // --------------- final update ----------------------
  if (ideaJSON.active === false) {
    newDCardCompact.appendChild(finalUpdateDOMObject(ideaJSON, user));
  } else {
    newDCardCompact.appendChild(finalUpdateDOMObjDummy(ideaJSON, user));
  }

  const dCardBody = document.createElement("div");
  dCardBody.className = "d-card-body";

  dCardBody.innerText = ideaJSON.body;
  newDCardCompact.appendChild(dCardBody);

  let expandTextFooter = document.createElement("div");
  expandTextFooter.className = "expand-text-footer";
  let numberOfVotes = ideaJSON.votes_yes + ideaJSON.votes_no;
  expandTextFooter.innerHTML =
    numberOfVotes +
    ' votes, <span id="number-comments' +
    ideaJSON._id +
    '">0</span> comments';
  newDCardCompact.appendChild(expandTextFooter);

  // ----------------------- truncation ---------------------------------
  if (ideaJSON.body.length >= 420) {
    dCardBody.classList.add("truncated");
  }

  newDCardExpanded.append(newDCardCompact);

  const debateSection = document.createElement("div");
  debateSection.className = "debate-section";
  debateSection.setAttribute("id", "debate-section" + ideaJSON._id);
  newDCardExpanded.appendChild(debateSection);

  const collapseFooter = document.createElement("div");
  collapseFooter.className = "collapse-footer";
  collapseFooter.innerText = "Collapse";
  newDCardExpanded.appendChild(collapseFooter);
  collapseFooter.style.display = "none";

  // ---------------------- expand/collapse idea -------------------------
  newDCardCompact.addEventListener("click", function () {
    if (expanded === false) {
      dCardBody.classList.remove("truncated");
      debateSection.style.display = "flex";
      newDCardExpanded.style.cursor = "default";
      expandTextFooter.style.display = "none";
      dCardBody.style.marginBottom = "40px";
      collapseFooter.style.display = "block";
    }
  });

  collapseFooter.addEventListener("click", function () {
    if (ideaJSON.body.length >= 420) {
      dCardBody.classList.add("truncated");
    }
    debateSection.style.display = "none";
    newDCardExpanded.style.cursor = "pointer";
    dCardBody.style.marginBottom = "10px";
    collapseFooter.style.display = "none";
    expandTextFooter.style.display = "block";
  });

  // ------------------ Yes column begins -------------------
  const colColYes = document.createElement("div");
  colColYes.className = "col col-yes";
  debateSection.appendChild(colColYes);

  const colHeaderBandYes = document.createElement("div");
  colHeaderBandYes.className = "col-header-band col-header-band-yes";
  colColYes.appendChild(colHeaderBandYes);

  // div that contains title of yes column and #votes tag
  const colTitleYes = document.createElement("div");
  colTitleYes.className = "col-title";
  colHeaderBandYes.appendChild(colTitleYes);

  // #votes tag (yes column)
  const yesVoteTag = document.createElement("div");
  yesVoteTag.className = "yes-vote-tag";
  yesVoteTag.innerHTML =
    "<span id=votes-yes" +
    ideaJSON._id +
    ">" +
    ideaJSON.votes_yes +
    "</span> feedback votes";
  colTitleYes.appendChild(yesVoteTag);

  // the form for yes
  const commentFormYes = document.createElement("form");
  colHeaderBandYes.appendChild(commentFormYes);
  commentFormYes.onsubmit = function () {
    return false;
  };

  // overall class for the form
  const commentFormClassYes = document.createElement("div");
  commentFormClassYes.className = "comment-form";
  commentFormYes.appendChild(commentFormClassYes);

  // comment field for yes -- where you input comments
  const commentFieldYes = document.createElement("input");
  commentFieldYes.className = "comment-field-yes comment-input"; // change to id and attach event listener
  commentFieldYes.id = "comment-field-yes" + ideaJSON._id;
  commentFieldYes.placeholder = "Add your positive feedback here...";

  if (ideaJSON.active === false) {
    commentFieldYes.placeholder = "Idea is now closed";
    commentFieldYes.disabled = true;
    commentFieldYes.classList.add("disabled-field");
  }
  commentFormClassYes.appendChild(commentFieldYes);

  // 'Post' button for yes comments
  const submitCommentYes = document.createElement("input");
  submitCommentYes.id = "submit-comment-yes-" + ideaJSON._id; //  add event listener
  submitCommentYes.className = "comment-button comment-button-yes";
  submitCommentYes.value = "Post";
  submitCommentYes.type = "Button";

  if (ideaJSON.active === false) {
    submitCommentYes.classList.add("disabled-button");
  }

  commentFormClassYes.appendChild(submitCommentYes);
  submitCommentYes.addEventListener("click", function () {
    submitCommentHandler(ideaJSON._id, "yes", user);
  });

  const colTagYesContainer = document.createElement("div");
  colTagYesContainer.className = "col-tag-yes-container";
  colColYes.appendChild(colTagYesContainer);

  const colYesTag = document.createElement("div");
  colYesTag.className = "col-yes-tag";
  colYesTag.innerText = "GOOD";
  colTagYesContainer.appendChild(colYesTag);

  // this is where the comments will be added to the yes column -- the list
  const yesComments = document.createElement("div");
  yesComments.id = "comments-yes" + ideaJSON._id; // change this ahhhh -- might not need to be here
  colColYes.appendChild(yesComments);

  // -------------------- BAD COLUMN BEGINS -----------------------------
  const colColNo = document.createElement("div");
  colColNo.className = "col";
  debateSection.appendChild(colColNo);

  const colHeaderBandNo = document.createElement("div");
  colHeaderBandNo.className = "col-header-band col-header-band-no";
  colColNo.appendChild(colHeaderBandNo);

  // div that contains title of no column and no #votes tag
  const colTitleNo = document.createElement("div");
  colTitleNo.className = "col-title";
  colHeaderBandNo.appendChild(colTitleNo);

  // #votes tag (no column)
  const noVoteTag = document.createElement("div");
  noVoteTag.className = "no-vote-tag";
  noVoteTag.innerHTML =
    "<span id=votes-no" +
    ideaJSON._id +
    ">" +
    ideaJSON.votes_no +
    "</span> feedback votes";
  colTitleNo.appendChild(noVoteTag);

  // overall form for BAD
  const commentFormNo = document.createElement("form");
  colHeaderBandNo.appendChild(commentFormNo);
  commentFormNo.onsubmit = function () {
    return false;
  };

  // the overall class for the no form
  const commentFormClassNo = document.createElement("div");
  commentFormClassNo.className = "comment-form";
  commentFormNo.appendChild(commentFormClassNo);

  // the input field for no
  const commentFieldNo = document.createElement("input");
  commentFieldNo.className = "comment-field-no comment-input"; // change to id and attach event listener
  commentFieldNo.id = "comment-field-no" + ideaJSON._id;
  commentFieldNo.placeholder = "Add your negative feedback here...";

  if (ideaJSON.active === false) {
    commentFieldNo.placeholder = "Idea is now closed";
    commentFieldNo.disabled = true;
    commentFieldNo.classList.add("disabled-field");
  }
  commentFormClassNo.appendChild(commentFieldNo);

  const submitCommentNo = document.createElement("input");
  submitCommentNo.className = "comment-button comment-button-no";
  submitCommentNo.id = "submit-comment-no-" + ideaJSON._id; //  add event listener
  submitCommentNo.value = "Post";
  submitCommentNo.type = "Button";

  if (ideaJSON.active === false) {
    submitCommentNo.classList.add("disabled-button");
  }
  commentFormNo.appendChild(submitCommentNo);

  //let body = inputField.value;

  submitCommentNo.addEventListener("click", function () {
    submitCommentHandler(ideaJSON._id, "no", user);
  });

  const colTagNoContainer = document.createElement("div");
  colTagNoContainer.className = "col-tag-no-container";
  colColNo.appendChild(colTagNoContainer);

  const colNoTag = document.createElement("div");
  colNoTag.className = "col-no-tag";
  colNoTag.innerText = "BAD";
  colTagNoContainer.appendChild(colNoTag);

  // where the comments will be added to the no column -- no list
  const noComments = document.createElement("div");
  noComments.id = "comments-no" + ideaJSON._id;
  colColNo.appendChild(noComments);

  return newIdea;
}

// ---------------COMMENT -------------------
function commentDOMObject(commentJSON, user) {
  commentDiv = document.createElement("div");
  commentDiv.setAttribute("id", "comment" + commentJSON._id);

  const newComment = document.createElement("div");
  newComment.className = "comment-wrapper";
  commentDiv.prepend(newComment);

  const commentText = document.createElement("div");
  commentText.innerText = commentJSON.body;
  commentText.className = "comment-body";
  newComment.appendChild(commentText);

  const commentVote = document.createElement("div");
  commentVote.className = "comment-vote";
  newComment.appendChild(commentVote);

  const voteButton = document.createElement("div");
  voteButton.className = "vote-button";
  voteButton.setAttribute("id", "comment-vote" + commentJSON._id);
  commentVote.appendChild(voteButton);

  let isVoted = checkIfVoted(commentJSON._id, user);
  if (isVoted) {
    voteButton.className = "vote-button voted";
  }

  voteButton.addEventListener("click", function () {
    commentVoteHandler(
      commentJSON._id,
      commentJSON.parent_id,
      commentJSON.yes_or_no,
      user
    );
  });

  const voteCount = document.createElement("div");
  voteCount.innerText = commentJSON.votes;
  voteCount.className = "vote-count";
  voteCount.id = "vote-count" + commentJSON._id;
  commentVote.appendChild(voteCount);

  const commentMeta = document.createElement("div");
  commentMeta.className = "comment-meta";
  newComment.appendChild(commentMeta);

  const commentThumb = document.createElement("div");
  commentThumb.className = "comment-thumb";
  commentThumb.style.backgroundColor = returnUserColorHex(
    null,
    commentJSON.creator_color
  );

  commentMeta.appendChild(commentThumb);

  const commentAuthor = document.createElement("span");
  commentAuthor.className = "comment-author";
  commentAuthor.innerText =
    commentJSON.creator_alias +
    " Whale posted " +
    timeSince(new Date(commentJSON.timestamp));
  commentMeta.appendChild(commentAuthor);

  return commentDiv;
}
