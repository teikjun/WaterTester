// ------------------- COMPOSER ----------------------
function openComposer() {
  let overlayComposer = document.getElementById("composer");
  overlayComposer.style.display = "flex";
  document.getElementById("comp-title").focus();
}

function closeComposer() {
  let overlayComposer = document.getElementById("composer");

  let title = document.getElementById("comp-title");
  let body = document.getElementById("comp-body");

  let categories = document.getElementsByClassName("comp-categories");

  for (let i = 0; i < categories.length; i++) {
    categories[i].className = "comp-categories";
  }
  title.value = "";
  body.value = "";
  overlayComposer.style.display = "none";
}

function makeCategoriesSelectable() {
  let categories = document.getElementsByClassName("comp-categories");

  for (let i = 0; i < categories.length; i++) {
    categories[i].addEventListener("click", function () {
      if (
        categories[i].className === "comp-categories comp-categories-selected"
      ) {
        categories[i].className = "comp-categories";
      } else {
        categories[i].className = "comp-categories comp-categories-selected";
      }
    });
  }
}
makeCategoriesSelectable();

const closeNewIdea = document.getElementById("close");
const overlay = document.getElementById("overlay");
closeNewIdea.addEventListener("click", closeComposer);
overlay.addEventListener("click", closeComposer);
const cancelNewIdea = document.getElementById("cancel-button");
cancelNewIdea.addEventListener("click", closeComposer);

// -------------- CLOSE DECISION COMPOSER --------------
function makeFinalBadgesSelectable() {
  let finalBadges = document.getElementsByClassName("final-update-button");

  let yesBadge = document.getElementById("final-yes");
  let noBadge = document.getElementById("final-no");

  yesBadge.addEventListener("click", function () {
    yesBadge.classList.add("final-yes-selected", "final-update-selected");
    noBadge.className = "final-update-button";
  });

  noBadge.addEventListener("click", function () {
    noBadge.classList.add("final-no-selected", "final-update-selected");
    yesBadge.className = "final-update-button";
  });
}

makeFinalBadgesSelectable();

function closeUpdateComposer() {
  let overlayComposer = document.getElementById("update-composer");

  let body = document.getElementById("update-comp-body");

  body.value = "";
  overlayComposer.style.display = "none";

  let yesBadge = document.getElementById("final-yes");
  let noBadge = document.getElementById("final-no");
  yesBadge.className = "final-update-button";
  noBadge.className = "final-update-button";
}

function openUpdateComposer(idea_id) {
  let overlayComposer = document.getElementById("update-composer");
  overlayComposer.style.display = "block";
}

const closeNewUpdate = document.getElementById("update-close");
const updateOverlay = document.getElementById("update-overlay");
const updateCancel = document.getElementById("update-cancel-button");
closeNewUpdate.addEventListener("click", closeUpdateComposer);
updateOverlay.addEventListener("click", closeUpdateComposer);
updateCancel.addEventListener("click", closeUpdateComposer);
closeUpdateComposer();

// ---------------------- NAVBAR ----------------------
function newNavbarItem(text, url) {
  const item = document.createElement("div");
  item.className = "nav-item";
  const link = document.createElement("a");
  link.href = url;
  link.innerHTML = text;
  item.appendChild(link);
  return item;
}

function returnUserColorHex(user, color = null) {
  if (user !== null) {
    if (user.color === "pink") {
      return "#F3ACE2";
    }
    if (user.color === "green") {
      return "#95D74E";
    }
    if (user.color === "purple") {
      return "#BA98E0";
    }
    if (user.color === "blue") {
      return "#46D9E5";
    }
    if (user.color === "yellow") {
      return "#F2E741";
    }
    if (user.color === "orange") {
      return "#FFB200";
    }
  } else if (color !== null) {
    if (color === "pink") {
      return "#F3ACE2";
    }
    if (color === "green") {
      return "#95D74E";
    }
    if (color === "purple") {
      return "#BA98E0";
    }
    if (color === "blue") {
      return "#46D9E5";
    }
    if (color === "yellow") {
      return "#F2E741";
    }
    if (color === "orange") {
      return "#FFB200";
    }
  }
}

function renderNavbar(user) {
  const navBarDiv = document.getElementById("nav-wrapper");
  navBarDiv.innerHTML = "";

  const navBarMsg = document.createElement("div");
  navBarMsg.className = "nav-item";
  navBarMsg.id = "navbar-message";
  navBarDiv.append(navBarMsg);

  if (user._id !== undefined) {
    if (user.color !== null || user.adjective !== null) {
      navBarMsg.innerHTML =
        '<div>Hello, </div><div id="nav-thumb"></div><div id="username">' +
        user.adjective +
        " Whale!</div>";
      document.getElementById(
        "nav-thumb"
      ).style.backgroundColor = returnUserColorHex(user);
      navBarDiv.appendChild(newNavbarItem("Browse", "/"));
      navBarDiv.appendChild(newNavbarItem("Profile", "/activity"));
      const newIdeaButton = document.createElement("button");
      newIdeaButton.id = "new-idea";
      newIdeaButton.className = "nav-item nav-button";
      newIdeaButton.innerHTML = "<div>Add New Idea</div>";
      navBarDiv.appendChild(newIdeaButton);
      newIdeaButton.addEventListener("click", openComposer);
    } else {
      navBarMsg.innerHTML =
        'Hello, <span id="username">' +
        user.name +
        "! Please choose your whale name" +
        "</span>";
    }
  } else {
    navBarMsg.innerHTML = "Welcome to WaterTester!";
    const linkToGoogle = document.createElement("a");
    linkToGoogle.href = "/auth/google";

    const signInButton = document.createElement("button");
    signInButton.id = "login-google";
    signInButton.className = "nav-item nav-button";
    signInButton.innerHTML = "<div>Login with Google</div>";
    linkToGoogle.appendChild(signInButton);

    navBarDiv.appendChild(linkToGoogle);
    console.log();
  }
}
