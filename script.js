const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgainButton = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById("final-message-reveal-word");
const emojiFace = document.getElementById("emoji-face");
const hiddenInput = document.getElementById("hidden-input");

const words = [
  "eth",
  "defi",
  "os",
  "reward",
  "early",
  "air",
  "trade",
  "communicate",
  "sandbox",
  "ux",
  "social",
  "create"
];

let selectedWord = words[Math.floor(Math.random() * words.length)];
let playable = true;
const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  wordElement.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
      <span class="letter">
        ${correctLetters.includes(letter) ? letter : ""}
      </span>
    `
      )
      .join("")}
  `;

  const innerWord = wordElement.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! Your Code is = GJ6YKG7U (just for fun) 😃";
    finalMessageRevealWord.innerText = "";
    popup.style.display = "flex";
    playable = false;
  }
}

function updateEmojiFace() {
  const sadEmojis = "😞".repeat(wrongLetters.length);
  emojiFace.innerText = sadEmojis;
}

function updateWrongLettersElement() {
  wrongLettersElement.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`).join("")}
  `;

  updateEmojiFace();

  if (wrongLetters.length === 6) {
    finalMessage.innerText = "You had 6 attempts and you failed 😞😞😞";
    finalMessageRevealWord.innerText = `The correct answer is: ${selectedWord}`;
    popup.style.display = "flex";
    playable = false;
  }
}

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// MOBILE/Universal input support
hiddenInput.addEventListener("input", (e) => {
  if (!playable) return;
  const letter = e.target.value.toLowerCase();
  hiddenInput.value = "";

  if (letter >= "a" && letter <= "z") {
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersElement();
      } else {
        showNotification();
      }
    }
  }
});

// Auto focus on input
window.addEventListener("load", () => hiddenInput.focus());
window.addEventListener("click", () => hiddenInput.focus());

playAgainButton.addEventListener("click", () => {
  playable = true;
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersElement();
  emojiFace.innerText = "";
  popup.style.display = "none";
});

displayWord();
