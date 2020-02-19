"use strict";

import randomWords from "random-words";

// Define global variables
let timer = 0;
let start = false;
let startTimer;
let passed = 0;
let failed = 0;

// Score containers
const passedScore = document.querySelector(".result-bar__passed span");
const failedScore = document.querySelector(".result-bar__failed span");

// Add random word
const wordWrapper = document.querySelector(".word");
let randomPhrase = randomWords({ min: 3, max: 10, join: " " });
wordWrapper.innerHTML = randomPhrase;

// Start game when user first types inside the input
const testInput = document.querySelector("input");
const timerNumber = document.querySelector(".result-bar__time span");
testInput.oninput = e => {
  if (!start) {
    start = true;
    startTimer = setInterval(() => {
      timer++;
      timerNumber.innerHTML = timer;
    }, 1000);
  }

  // Stop the game and check for results when result string and random string are the same
  if (e.target.value.length == randomPhrase.length) {
    // stop timer and disable input
    clearInterval(startTimer);
    testInput.disabled = true;
    if (e.target.value == randomPhrase) {
      // Add success style and increase passedScore
      testInput.classList.add("success");
      passed++;
      passedScore.innerHTML = passed;
    } else {
      // Add error style and increase failedScore
      testInput.classList.add("error");
      failed++;
      failedScore.innerHTML = failed;
    }
    setTimeout(() => {
      // Clear input, generate new random word and restart timer
      testInput.value = "";
      testInput.classList.remove("success");
      testInput.classList.remove("error");
      testInput.disabled = false;
      randomPhrase = randomWords({ min: 3, max: 10, join: " " });
      wordWrapper.innerHTML = randomPhrase;
      timer = 0;
      timerNumber.innerHTML = timer;
    }, 1200);
  }
};
