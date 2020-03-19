const colors = ["Pink", "Green", "Purple", "Blue", "Yellow", "Orange"];

const adjectives = [
  "Quirky",
  "Happy",
  "Great",
  "Soft",
  "Witty",
  "Kind",
  "Peaceful",
  "Jumpy",
  "Friendly",
  "Joyful",
  "Loving",
  "Bright",
  "Calm",
  "Tender",
  "Honest",
  "Smooth",
  "Humble",
  "Sacred",
  "Lively",
  "Quiet",
  "Hyper",
  "Polite",
  "Helpful",
  "Mystic",
  "Benign",
  "Chill",
  "Elated",
  "Excited",
  "Brave",
  "Lucky",
  "Flamboyant",
  "Facetious",
  "Chatty",
  "Hilarious",
  "Fabulous",
  "Friendly",
  "Shy",
  "Magical",
  "Fantastical",
  "Brilliant",
  "Sarcastic",
  "Sassy",
  "Super",
  "Insane",
  "Sane",
  "Hopeless",
  "Hopeful",
  "Helpful",
  "Attractive",
  "Beautiful",
  "Clean",
  "Dazzling",
  "Killer",
  "Elegant",
  "Fancy",
  "Fit",
  "Glamorous",
  "Handsome",
  "Magnificent",
  "Muscular",
  "Plain",
  "Plump",
  "Scruffy",
  "Shapely",
  "Stocky",
  "Unkempt",
  "Beluga",
  "Agreeable",
  "Ambitious",
  "Calm",
  "Eager",
  "Gentle",
  "Jolly",
  "Lively",
  "Obedient",
  "Polite",
  "Thankful",
  "Victorious",
  "Witty",
  "Zealous",
  "Odd",
  "Exuberant",
  "Clumsy",
  "Fierce",
  "Mysterious",
  "Lazy",
  "Colossal",
  "Great",
  "Immense",
  "Microscopic",
  "Exuberant",
  "Miniature",
  "Original",
  "Innovative",
  "Futuristic",
  "Sparkling",
  "Splendid",
  "Vivacious",
  "Wild",
  "Modern",
  "Adorable",
  "Glowing",
  "Diligent",
  "Jovial",
  "Relieved",
  "Thrilled",
  "Talented",
  "Successful",
  "Peaceful",
  "Sincere",
  "Amused",
  "Confused",
  "Sober",
  "Goofy",
  "Pioneering",
  "Charming",
  "Groundbreaking",
  "Humpback",
  "Revolutionary",
  "Trailblazing",
  "Inventive",
  "Tasty",
  "Wacky",
  "Useful",
  "Wise",
  "Young",
  "Yummy",
  "Musical",
  "Slippery",
  "Perfect",
  "Warm",
  "Abrupt",
  "Alert",
  "Aloof",
  "Amiable",
  "Bohemian",
  "Bowhead",
  "Bulky",
  "Biting",
  "Cheeky",
  "Elated",
  "Dashing",
  "Distinct",
  "Renaissance",
  "Northern",
  "Southern",
  "Unorthodox",
  "Unfamiliar"
];

function randomize() {
  let randomColor = Math.floor(Math.random() * colors.length);
  let randomAdj = Math.floor(Math.random() * adjectives.length);
  let userColor = document.getElementById("whale-thumbnail");
  let userAdj = document.getElementById("name-adj");

  console.log(colors[randomColor]);
  if (colors[randomColor] === "Pink") {
    userColor.style.backgroundColor = "#F3ACE2";
  }
  if (colors[randomColor] === "Green") {
    userColor.style.backgroundColor = "#95D74E";
  }
  if (colors[randomColor] === "Purple") {
    userColor.style.backgroundColor = "#BA98E0";
  }
  if (colors[randomColor] === "Blue") {
    userColor.style.backgroundColor = "#46D9E5";
  }
  if (colors[randomColor] === "Yellow") {
    userColor.style.backgroundColor = "#F2E741";
  }
  if (colors[randomColor] === "Orange") {
    userColor.style.backgroundColor = "#FFB200";
  }

  //userColor.innerHTML=colors[randomColor];
  userAdj.innerHTML = adjectives[randomAdj];
}

function chooseNameHandler(user) {
  // find color then switch hex code back to color ??
  let chosenColor = document.getElementById("whale-thumbnail").style
    .backgroundColor;
  if (chosenColor === "rgb(243, 172, 226)") {
    chosenColor = "pink";
  }
  if (chosenColor === "rgb(149, 215, 78)") {
    chosenColor = "green";
  }
  if (chosenColor === "rgb(186, 152, 224)") {
    chosenColor = "purple";
  }
  if (chosenColor === "rgb(27, 85, 90)") {
    chosenColor = "blue";
  }
  if (chosenColor === "rgb(242, 231, 65)") {
    chosenColor = "yellow";
  }
  if (chosenColor === "rgb(255, 178, 0)") {
    chosenColor = "orange";
  }
  let chosenAdj = document.getElementById("name-adj").innerText;

  if (user !== undefined) {
    post("/api/updateUserName", {
      _id: user._id,
      adjective: chosenAdj,
      color: chosenColor
    });
  }
}
