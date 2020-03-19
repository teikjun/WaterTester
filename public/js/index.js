function renderLoggedInFeed(user) {
  const body = document.getElementsByTagName("body");
  body[0].removeEventListener("keydown", randomize);
  const appDiv = document.getElementById("app");
  appDiv.innerHTML =
    '<div id="app-wrapper">' +
    '<ul id="categories">' +
    '<li class="feed-cat category-selected"><div class="cat-img" id="cat-all"></div>All</li>' +
    '<li class="feed-cat"><div class="cat-img" id="cat-web"></div>Web</li>' +
    '<li class="feed-cat"><div class="cat-img" id="cat-android"></div>Android</li>' +
    '<li class="feed-cat"><div class="cat-img" id="cat-ios"></div>iOS</li>' +
    '<li class="feed-cat"><div class="cat-img" id="cat-games"></div>Games</li>' +
    '<li class="feed-cat"><div class="cat-img" id="cat-ext"></div>Extensions</li>' +
    '<li class="feed-cat"><div class="cat-img" id="cat-com"></div>Community</li>' +
    '<li class="feed-cat"><div class="cat-img" id="cat-team"></div>Team</li>' +
    '<li class="feed-cat"><div class="cat-img" id="cat-ran"></div>Random</li>' +
    "</ul>" +
    '<div id = "feed-wrapper">' +
    '<div id = "feed-header"></div>' +
    '<div id = "tutorial-container"></div>' +
    '<div id ="feed"></div>' +
    "</div>" +
    "</div>";
  renderFeed(user);

  let categoriesArr = document.getElementsByClassName("feed-cat");
  for (let i = 0; i < categoriesArr.length; i++) {
    categoriesArr[i].addEventListener("click", function () {
      if (this.innerText === "All") {
        renderFeed(user);
      } else {
        renderFeedByCategory(user, this.innerText);
      }
      for (let j = 0; j < categoriesArr.length; j++) {
        categoriesArr[j].className = "feed-cat";
      }
      categoriesArr[i].className = "feed-cat category-selected";
    });
  }
}

function renderWhaleNamePicker() {
  const appDiv = document.getElementById("app");
  const body = document.getElementsByTagName("body");
  body[0].addEventListener("keydown", randomize);
  appDiv.innerHTML =
    "<div id=clouds>" +
    "<div id=cloud1>" +
    "</div" +
    "<div id=cloud2>" +
    "</div" +
    "<div id=cloud3>" +
    "</div" +
    "<div id=cloud4>" +
    "</div" +
    "<div id=cloud5>" +
    "</div" +
    "<div id=cloud6>" +
    "</div>" +
    "<div id=cloud7>" +
    "</div>" +
    "<div id=cloud8>" +
    "</div>" +
    "<div id=cloud9>" +
    "</div>" +
    "</div>" +
    '<div id="name-generator">' +
    '<div id="generator-container" class = "generator-container">' +
    '<div id = "press-key-title">Welcome! Press any key to create your unique whale identity</div>' +
    '<div id="greeting">' +
    '<div id = "name-container">' +
    '<div id = "whale-thumbnail" onkeypress=randomize()>' +
    "</div>" +
    "<div id= name-adj class=name-adjcolor onkeypress=randomize()>" +
    "Happy" +
    "</div>" +
    "<div class=name-fixed>" +
    "whale" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<button id="choose-name" class = "sign-in-button">' +
    "I choose this name" +
    "</button>" +
    "</div>" +
    "</div>";
  randomize();
}

function renderSignIn() {
  const appDiv = document.getElementById("app");
  appDiv.style.height = "80vh";
  appDiv.innerHTML =
    "<div id=clouds>" +
    "<div id=cloud1>" +
    "</div" +
    "<div id=cloud2>" +
    "</div" +
    "<div id=cloud3>" +
    "</div" +
    "<div id=cloud4>" +
    "</div" +
    "<div id=cloud5>" +
    "</div" +
    "<div id=cloud6>" +
    "</div>" +
    "<div id=cloud7>" +
    "</div>" +
    "<div id=cloud8>" +
    "</div>" +
    "<div id=cloud9>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div id="signin-description">' +
    '<div id="signin-1"> Develop your idea with user insights.</div >' +
    '<div id="signin-2">' +
    "<div>If you're working on a new idea, you’ve come to right place. Float your idea to our community of users and receive feedback.</div>" +
    "</div>" +
    '<button id=become-whale class="sign-in-button">' +
    '    <a class = "become-whale-text" href="/auth/google">Test the Waters</a>' +
    "</button>" +
    "</div>" +
    "<div id= whale-landscape>" +
    "</div>";
  ("</div>");
  ("</div>");
}

function renderNextButton(user_id) {
  let chooseName = document.getElementById("choose-name");
  let pressKeyTitle = document.getElementById("press-key-title");
  let nameContainer = document.getElementById("name-container");
  /*chooseName.style.backgroundColor = '#03bff4';
    chooseName.style.color = '#ffffff';*/
  chooseName.style.display = "none";
  pressKeyTitle.style.display = "none";
  nameContainer.style.width = "max-content";
  const nextButton = document.createElement("div");
  nextButton.id = "next-button";
  nextButton.innerHTML = "Begin your whale life";

  nextButton.addEventListener("click", function () {
    get("/api/userById", { _id: user_id }, function (user) {
      const appDiv = document.getElementById("app");

      renderApp(user);
      renderNavbar(user);
      renderTutorial();
      console.log(user);
    });
  });

  return nextButton;
}

function renderApp(user) {
  const appDiv = document.getElementById("app");
  if (user._id !== undefined) {
    if (user.color !== null || user.adjective !== null) {
      const postIdea = document.getElementById("post-button");
      postIdea.addEventListener("click", function () {
        submitIdeaHandler(user);
      });
      renderLoggedInFeed(user);
    } else {
      renderWhaleNamePicker();
      document
        .getElementById("choose-name")
        .addEventListener("click", function () {
          chooseNameHandler(user);
          document
            .getElementById("generator-container")
            .appendChild(renderNextButton(user._id));
        });
    }
  } else {
    renderSignIn();
  }
}

function main() {
  get("/api/whoami", {}, function (user) {
    if (user._id !== undefined) {
      get("/api/userById", { _id: user._id }, function (userDBItem) {
        console.log(userDBItem);
        renderNavbar(userDBItem);
        renderApp(userDBItem);
        //remove tutorial div
        var parent = document.getElementById("feed-wrapper");
        var child = document.getElementById("tutorial-container");
        parent.removeChild(child);
      });
    } else {
      renderNavbar(user);
      renderApp(user);
    }
  });
}

main();

function renderTutorial() {
  let currentStep = 0;

  const tutorialDiv = document.getElementById("tutorial-container");
  tutorialDiv.style.backgroundColor = "rgba(53,210,225,0.17)";
  tutorialDiv.innerHTML =
    '<div id="step-title">' +
    '<div id="step-number">' +
    "</div>" +
    '<div id="step-description">' +
    "</div>" +
    "</div>" +
    '<div id ="skip-tutorial" onclick="skipTutorial">' +
    "x" +
    "</div>" +
    '<div id="tim">' +
    '<div id ="whale-and-cloud">' +
    //tim on a cloud- have him enter from the left
    "</div>" +
    '<div id ="tim-speech-bubble">' +
    '<div id="tutorial-visual">' +
    "</div>" +
    '<div id = "tim-says">' +
    "Welcome to WaterTester! Let me show you around." +
    "</div>" +
    '<div id = "any-key">' +
    "Press any key to continue" +
    "</div>" +
    "</div>" +
    "</div>";

  const body = document.getElementsByTagName("body");
  body[0].addEventListener("keydown", nextStep); //if key pressed, go to next step
}
