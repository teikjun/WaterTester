// ------- Render feed ------

function renderFeed(user) {
  let ideaDiv = document.getElementById("feed");
  ideaDiv.innerHTML = "";
  let feedHeaderDiv = document.getElementById("feed-header");
  feedHeaderDiv.innerHTML = "";

  get("/api/ideas", {}, function (dArray) {
    for (let i = 0; i < dArray.length; i++) {
      const currentIdea = dArray[i];
      const newIdeaDOMObj = ideaDOMObject(currentIdea, user);
      ideaDiv.prepend(newIdeaDOMObj);
      let yes_votes = 0;
      let no_votes = 0;

      // render comments
      get("/api/comments", { parent_id: currentIdea._id }, function (cArray) {
        document.getElementById("number-comments" + currentIdea._id).innerText =
          cArray.length;

        yesDiv = document.getElementById("comments-yes" + currentIdea._id);
        const emptyDivYes = document.createElement("div");
        emptyDivYes.className = "empty-div-yes";
        emptyDivYes.innerText = "Be the first to post a positive feedback!";
        yesDiv.prepend(emptyDivYes);

        noDiv = document.getElementById("comments-no" + currentIdea._id);
        const emptyDivNo = document.createElement("div");
        emptyDivNo.className = "empty-div-no";
        emptyDivNo.innerText = "Be the first to post a negative feedback!";
        noDiv.prepend(emptyDivNo);

        for (let i = 0; i < cArray.length; i++) {
          let currentComment = cArray[i];
          if (currentComment.yes_or_no === "yes") {
            emptyDivYes.style.display = "none";
            yesDiv = document.getElementById(
              "comments-yes" + currentComment.parent_id
            );
            yesDiv.prepend(commentDOMObject(currentComment, user));
            yes_votes = yes_votes + currentComment.votes;
          } else {
            emptyDivNo.style.display = "none";
            noDiv = document.getElementById(
              "comments-no" + currentComment.parent_id
            );
            noDiv.prepend(commentDOMObject(currentComment, user));
            no_votes = no_votes + currentComment.votes;
          }
        }
        updateIdeaVotes(
          currentIdea._id,
          yes_votes,
          no_votes,
          currentIdea.active
        );
      });
    }
  });
}

function renderCategoryHeader(category) {
  const categoryDiv = document.createElement("div");
  categoryDiv.className = "category-div";

  const categoryImageBack = document.createElement("div");
  categoryImageBack.className = "category-image-back";
  categoryDiv.appendChild(categoryImageBack);

  const categoryImage = document.createElement("div");
  categoryImage.className = "category-image";
  categoryImageBack.appendChild(categoryImage);

  const categoryHeader = document.createElement("div");
  categoryHeader.className = "category-header";
  categoryDiv.appendChild(categoryHeader);

  const categoryTitle = document.createElement("div");
  categoryTitle.className = "category-title";
  categoryHeader.appendChild(categoryTitle);

  const categoryDesc = document.createElement("div");
  categoryDesc.className = "category-desc";
  categoryHeader.appendChild(categoryDesc);

  if (category === "Web") {
    categoryImageBack.style.backgroundColor = "#ffeecc";
    categoryTitle.innerText = "Web";
    categoryImage.style.backgroundPosition = "center top";
    categoryDesc.innerText =
      "Welcome to the Web category, where you can post any web application ideas. " +
      "Need some feedback for your web application idea? Your fellow whales can help!";
  }
  if (category === "Android") {
    categoryImageBack.style.backgroundColor = "#dfffe0";
    categoryImage.style.backgroundPosition = "center -60px";
    categoryTitle.innerText = "Android";
    categoryDesc.innerText =
      "Welcome to the Android category, where you can post any Android application ideas. " +
      "Need some suggestions to improve your Android idea? Your fellow whales can help!";
  }
  if (category === "iOS") {
    categoryImageBack.style.backgroundColor = "#eff1f3";
    categoryImage.style.backgroundPosition = "center -120px";
    categoryTitle.innerText = "iOS";
    categoryDesc.innerText =
      "Welcome to the iOS category, where you can post any iOS application ideas. " +
      "Thinking of making an application for iPhone or iPad users? Find out what your users think of it!";
  }
  if (category === "Games") {
    categoryImageBack.style.backgroundColor = "#f7ddd5";
    categoryImage.style.backgroundPosition = "center -180px";
    categoryTitle.innerText = "Games";
    categoryDesc.innerText =
      "Welcome to the Games category, where you can post any game ideas. " +
      "Post your game idea and find out what your players would think of it!";
  }
  if (category === "Extensions") {
    categoryImageBack.style.backgroundColor = "#fff4b9";
    categoryImage.style.backgroundPosition = "center -240px";
    categoryTitle.innerText = "Extensions";
    categoryDesc.innerText =
      "Welcome to the Extensions category, where you can post any ideas for extensions. " +
      "Thinking of creating a Chrome or Firefox extension? Float your idea!";
  }
  if (category === "Community") {
    categoryImageBack.style.backgroundColor = "#BAF0EB";
    categoryImage.style.backgroundPosition = "center -300px";
    categoryTitle.innerText = "Community";
    categoryDesc.innerText =
      "Welcome to the Community category, where you can post any community-based idea. " +
      "Have an idea that involves community participation? Share it with our helpful whale community!";
  }
  if (category === "Team") {
    categoryImageBack.style.backgroundColor = "#c8fdfd;";
    categoryImage.style.backgroundPosition = "center -360px";
    categoryTitle.innerText = "Team";
    categoryDesc.innerText =
      "Welcome to the Team category. Are you looking for teammates to collaborate on your project? " +
      "Post your idea so that interested whales can express their interest in the comments!";
  }
  if (category === "Random") {
    categoryImageBack.style.backgroundColor = "rgb(228, 241, 255)";
    categoryImage.style.backgroundPosition = "center -420px";
    categoryTitle.innerText = "Random";
    categoryDesc.innerText =
      "Welcome to the Random category, where you can post any random ideas. " +
      "Not sure which category to put your idea under? Put it here!";
  }
  return categoryDiv;
}

function renderFeedByCategory(user, category) {
  let ideaDiv = document.getElementById("feed");
  let feedHeaderDiv = document.getElementById("feed-header");
  feedHeaderDiv.innerHTML = "";
  ideaDiv.innerHTML = "";

  get("/api/ideas", {}, function (dArray) {
    for (let i = 0; i < dArray.length; i++) {
      const currentIdea = dArray[i];
      let isInCategory = false;

      for (let i = 0; i < currentIdea.categories.length; i++) {
        if (currentIdea.categories[i] === category) {
          isInCategory = true;
          break;
        }
      }

      if (isInCategory) {
        const newIdeaDOMObj = ideaDOMObject(currentIdea, user);
        ideaDiv.prepend(newIdeaDOMObj);
        let yes_votes = 0;
        let no_votes = 0;

        // render comments
        get("/api/comments", { parent_id: currentIdea._id }, function (cArray) {
          document.getElementById(
            "number-comments" + currentIdea._id
          ).innerText = cArray.length;

          yesDiv = document.getElementById("comments-yes" + currentIdea._id);
          const emptyDivYes = document.createElement("div");
          emptyDivYes.className = "empty-div-yes";
          emptyDivYes.innerText = "Be the first to post  a feedback for yes!";
          yesDiv.prepend(emptyDivYes);

          noDiv = document.getElementById("comments-no" + currentIdea._id);
          const emptyDivNo = document.createElement("div");
          emptyDivNo.className = "empty-div-no";
          emptyDivNo.innerText = "Be the first to post  a feedback for no!";
          noDiv.prepend(emptyDivNo);

          for (let i = 0; i < cArray.length; i++) {
            let currentComment = cArray[i];
            if (currentComment.yes_or_no === "yes") {
              emptyDivYes.style.display = "none";
              yesDiv = document.getElementById(
                "comments-yes" + currentComment.parent_id
              );
              yesDiv.prepend(commentDOMObject(currentComment, user));
              yes_votes = yes_votes + currentComment.votes;
            } else {
              emptyDivNo.style.display = "none";
              noDiv = document.getElementById(
                "comments-no" + currentComment.parent_id
              );
              noDiv.prepend(commentDOMObject(currentComment, user));
              no_votes = no_votes + currentComment.votes;
            }
          }
          updateIdeaVotes(
            currentIdea._id,
            yes_votes,
            no_votes,
            currentIdea.active
          );
        });
      }
    }
    feedHeaderDiv.append(renderCategoryHeader(category));
  });
}

function renderFeedByUser(user) {
  let ideaDiv = document.getElementById("feed");
  ideaDiv.innerHTML = "";

  get("/api/ideas", {}, function (dArray) {
    for (let i = 0; i < dArray.length; i++) {
      const ideaCreatorId = dArray[i].creator_id;
      let isByUser = user._id === ideaCreatorId;

      if (isByUser) {
        const newIdeaDOMObj = ideaDOMObject(currentIdea, user);
        ideaDiv.prepend(newIdeaDOMObj);
        let yes_votes = 0;
        let no_votes = 0;

        // render comments
        get("/api/comments", { parent_id: currentIdea._id }, function (cArray) {
          document.getElementById(
            "number-comments" + currentIdea._id
          ).innerText = cArray.length;

          for (let i = 0; i < cArray.length; i++) {
            let currentComment = cArray[i];
            if (currentComment.yes_or_no === "yes") {
              yesDiv = document.getElementById(
                "comments-yes" + currentComment.parent_id
              );
              yesDiv.prepend(commentDOMObject(currentComment, user));
              yes_votes = yes_votes + currentComment.votes;
            } else {
              noDiv = document.getElementById(
                "comments-no" + currentComment.parent_id
              );
              noDiv.prepend(commentDOMObject(currentComment, user));
              no_votes = no_votes + currentComment.votes;
            }
          }
          updateIdeaVotes(
            currentIdea._id,
            yes_votes,
            no_votes,
            currentIdea.active
          );
        });
      }
    }
  });
}

// ----------- Update ideas on the front end -------------
function updateIdeaVotes(idea_id, yes_votes, no_votes, active) {
  let currentNoVotes = 0;
  let currentYesVotes = 0;

  if (yes_votes !== null) {
    currentYesVotes = yes_votes;
  } else {
    currentYesVotes = parseInt(
      document.getElementById("votes-yes" + idea_id).innerText
    );
  }

  if (no_votes !== null) {
    currentNoVotes = no_votes;
  } else {
    currentNoVotes = parseInt(
      document.getElementById("votes-no" + idea_id).innerText
    );
  }

  document.getElementById("votes-yes" + idea_id).innerText = currentYesVotes;
  document.getElementById("votes-no" + idea_id).innerText = currentNoVotes;
  updateStatusBadge(idea_id, currentYesVotes, currentNoVotes, active);

  post("api/updateIdeaVotes", {
    _id: idea_id,
    votes_yes: yes_votes,
    votes_no: no_votes
  });
}

function updateStatusBadge(idea_id, yes_votes, no_votes, active) {
  let statusDiv = document.getElementById("d-card-status" + idea_id);
  statusDiv.innerHTML = "";

  const statusBadge = document.createElement("div");
  statusBadge.className = "status-badge";

  let statusBadgePercent;

  const statusText = document.createElement("div");
  statusText.className = "status-text";

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

  if (active === false) {
    statusBadge.innerText = "CLOSED";
    statusBadge.style.backgroundColor = "#E1E8ED";
    statusText.innerText = "";
  } else if (!isNaN(statusBadgePercent)) {
    statusBadge.innerText = statusBadgePercent + "% " + statusBadge.innerText;
  }

  statusDiv.appendChild(statusBadge);
  statusDiv.appendChild(statusText);
}

function updateIdeaVotesYes(idea_id, add_or_subtract) {
  let currentYesVotes = parseInt(
    document.getElementById("votes-yes" + idea_id).innerText
  );
  if (add_or_subtract === "add") {
    updateIdeaVotes(idea_id, currentYesVotes + 1, null);
  } else {
    updateIdeaVotes(idea_id, currentYesVotes - 1, null);
  }
}

function updateIdeaVotesNo(idea_id, add_or_subtract) {
  let currentNoVotes = parseInt(
    document.getElementById("votes-no" + idea_id).innerText
  );
  if (add_or_subtract === "add") {
    updateIdeaVotes(idea_id, null, currentNoVotes + 1);
  } else {
    updateIdeaVotes(idea_id, null, currentNoVotes - 1);
  }
}
