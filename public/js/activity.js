let totalByUser = 0;
let totalUpdatesByUser = 0;

function renderFeedByUser(user) {
  console.log("rendering feed");
  let ideaDiv = document.getElementById("feed");
  ideaDiv.innerHTML = "";

  get("/api/ideas", {}, function(dArray) {
    for (let i = 0; i < dArray.length; i++) {
      let currentIdea = dArray[i];
      const ideaCreatorId = dArray[i].creator_id;
      let isByUser = user._id === ideaCreatorId;

      if (isByUser) {
        const newIdeaDOMObj = ideaDOMObject(currentIdea, user, true);
        ideaDiv.prepend(newIdeaDOMObj);
        let yes_votes = 0;
        let no_votes = 0;
        totalByUser++;

        if (currentIdea.active === false) {
          totalUpdatesByUser++;
        }

        // render comments
        get("/api/comments", { parent_id: currentIdea._id }, function(cArray) {
          document.getElementById(
            "number-comments" + currentIdea._id
          ).innerText = cArray.length;
          yesDiv = document.getElementById("comments-yes" + currentIdea._id);
          const emptyDivYes = document.createElement("div");
          emptyDivYes.className = "empty-div-yes";
          emptyDivYes.innerText = "No whales have posted a positive feedback!";
          yesDiv.prepend(emptyDivYes);

          noDiv = document.getElementById("comments-no" + currentIdea._id);
          const emptyDivNo = document.createElement("div");
          emptyDivNo.className = "empty-div-no";
          emptyDivNo.innerText = "No whales have posted a negative feedback!";
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
    if (totalByUser === 0) {
      const noIdeasYet = document.createElement("div");
      noIdeasYet.className = "empty-div-yes";
      noIdeasYet.style.textAlign = "center";
      noIdeasYet.style.paddingTop = "40px";
      noIdeasYet.innerText = "You haven't posted any ideas yet!";
      ideaDiv.prepend(noIdeasYet);
    }
    document.getElementById("number-ideas").innerText = totalByUser + " ideas";
    document.getElementById("number-updates").innerText =
      totalUpdatesByUser + " updates";
  });
}

function main() {
  get("/api/whoami", {}, function(user) {
    if (user._id !== undefined) {
      get("/api/userById", { _id: user._id }, function(userDBItem) {
        console.log(userDBItem);
        document.getElementById("user-alias").innerText =
          userDBItem.adjective + " Whale";
        document.getElementById("user-google-name").innerHTML = userDBItem.name;
        document.getElementById(
          "user-activity-thumb"
        ).style.backgroundColor = returnUserColorHex(userDBItem, null);

        document.getElementById(
          "user-color-band"
        ).style.backgroundColor = returnUserColorHex(userDBItem, null);
        document.getElementById("user-color-band").style.opacity = 0.3;
        document.getElementById("number-hearts").innerText =
          userDBItem.liked_comments.length + " feedbacks liked";

        renderNavbar(userDBItem);
        renderFeedByUser(userDBItem);

        const postIdea = document.getElementById("post-button");
        postIdea.addEventListener("click", function() {
          submitIdeaHandler(userDBItem);
        });
      });
    } else {
      window.location.href = "/";
    }
  });
}

main();
