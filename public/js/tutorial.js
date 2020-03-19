function nextStep() {
  console.log("working");

  const titleDiv = document.getElementById("step-title");
  const stepNumber = document.getElementById("step-number");
  const stepDescription = document.getElementById("step-description");
  const timSays = document.getElementById("tim-says");
  //const tutorialVisual = document.getElementById('tutorial-visual');
  const body = document.getElementsByTagName("BODY")[0];

  console.log(timSays.innerHTML);

  if (timSays.innerHTML === "Welcome to WaterTester! Let me show you around.") {
    console.log("1");
    stepNumber.style.backgroundColor = "#35D2E1";
    stepNumber.innerHTML = "1";
    stepDescription.innerHTML = "Post Ideas";
    timSays.innerHTML =
      "Share your ideas with other whales! Give each idea a title, include the details of your idea, select relevant categories, then post!";
  } else if (stepNumber.innerHTML.trim() === "1") {
    console.log("2");
    stepNumber.style.backgroundColor = "#35D2E1";
    stepNumber.innerHTML = "2";
    stepDescription.innerHTML = "Get User Feedback";
    timSays.innerHTML =
      "Whales post 'good' or 'bad' feedback for the idea, then 'like' the feedback that they agree with. The average feedback is calculated by how many 'likes' there are for each side!";
  } else if (stepNumber.innerHTML.trim() === "2") {
    console.log("3");
    stepNumber.style.backgroundColor = "#35D2E1";
    stepNumber.innerHTML = "3";
    stepDescription.innerHTML = "Explore!";
    timSays.innerHTML =
      "Leave feedback for ideas in 'Browse,' view your personal information in 'Profile,' and explore different categories!";
  } else if (stepNumber.innerHTML.trim() === "3") {
    stepNumber.style.backgroundColor = "transparent";
    stepNumber.innerHTML = "";
    stepDescription.innerHTML = "";
    timSays.innerHTML = "Now you're ready to enter WaterTester. Go on!";
    body.removeChild(tutorialVisual);
    titleDiv.removeChild(stepNumber);
  } else if (
    timSays.innerHTML === "Now you're ready to enter WaterTester. Go on!"
  ) {
    main();
  }
}

function skipTutorial() {
  console.log("SKIP");
  main();
}
