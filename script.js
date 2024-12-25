console.log("Script loaded!");

// Initialize EmailJS
emailjs.init("c5XpDR5Q3l7n_kesg"); // Replace with your EmailJS User ID

// Reference the form and button
const form = document.getElementById("birthday-wishes-form");
const sendButton = document.getElementById("send-button");

// Add click event to the button
sendButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent default form submission
  
  // Gather form data
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  // Send the email using EmailJS
  emailjs.send("service_zmkuwsq", "template_be1bge3", {
    name: name,
    phone: phone,
    message: message
  })

    .then(() => {
      alert("Your wish has been sent successfully!");
      form.reset(); // Clear the form
    })
    .catch((error) => {
      alert("Failed to send your wish. Please try again.");
      console.error("EmailJS Error:", error);
    });
});

function openModal(image) {
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const captionText = document.getElementById("caption");

  // Display the modal
  modal.style.display = "flex";
  modalImage.src = image.src; // Set modal image source
  captionText.textContent = image.alt; // Set modal caption
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("image-modal");
  modal.style.display = "none"; // Hide the modal
  document.body.style.overflow = "auto";
}


//Word list
const words = [
    { word: "CAKE", hint: "This is a treat you eat on birthdays." },
    { word: "BALLOON", hint: "You blow this up for decorations." },
    { word: "OMGS", hint: "First/Junior secondary school." },
    { word: "BSSO", hint: "His senior secondary school." },
    { word: "FUTO", hint: "University he graduted from." },
    { word: "ENGINEERING", hint: "His field of studies." },
    { word: "STEPHEN", hint: "Name of his bestfriend." },
    { word: "GAMES", hint: "Fun activities played during celebrations." },
    { word: "VOLLEYBALL", hint: "His favorite sport game." },
    { word: "SIP-GARRI", hint: "His favorite food (mix with sugar and milk)." }
  ];
  
  let currentWordIndex = 0;
  let guessedLetters = [];
  let guessesLeft = 5;
  let score = 0;
  
  const hintElement = document.getElementById("hint");
  const puzzleWordElement = document.querySelector(".puzzle-word");
  const guessInput = document.getElementById("guess-input");
  const submitButton = document.getElementById("submit-guess");
  const feedbackElement = document.getElementById("feedback");
  const guessesLeftElement = document.getElementById("guesses-left");
  const scoreElement = document.getElementById("score");

  console.log("Elements loaded:", {
    hintElement,
    puzzleWordElement,
    guessInput,
    submitButton,
    feedbackElement,
    guessesLeftElement,
    scoreElement
  });
  
  // Initialize the puzzle
  function initializePuzzle() {
    const currentWord = words[currentWordIndex].word;
    guessedLetters = Array(currentWord.length).fill("_");
    guessesLeft = 3;
  
    // Update UI
    updatePuzzleWord();
    hintElement.textContent = `Hint: ${words[currentWordIndex].hint}`;
    guessesLeftElement.textContent = guessesLeft;
    feedbackElement.textContent = "";
    guessInput.value = "";
    console.log("Puzzle initialized for word:", currentWord);
  }
  
  // Update the displayed puzzle word
  function updatePuzzleWord() {
    puzzleWordElement.innerHTML = guessedLetters
      .map(letter => `<span class="letter">${letter}</span>`)
      .join("");
  }
  
  // Handle guess submission
  submitButton.addEventListener("click", () => {
    const guess = guessInput.value.toUpperCase();
    guessInput.value = "";
  
    if (!guess || guess.length !== 1) {
      feedbackElement.textContent = "Please enter a single letter.";
      return;
    }
  
    const currentWord = words[currentWordIndex].word;
  
    if (currentWord.includes(guess)) {
      feedbackElement.textContent = `Good guess! "${guess}" is in the word.`;
  
      // Reveal the guessed letter
      for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === guess) {
          guessedLetters[i] = guess;
        }
      }
    } else {
      feedbackElement.textContent = `Sorry, "${guess}" is not in the word.`;
      guessesLeft--;
    }
  
    updatePuzzleWord();
    guessesLeftElement.textContent = guessesLeft;
  
    // Check win or lose condition
    if (!guessedLetters.includes("_")) {
      score++;
      scoreElement.textContent = score;
  
      if (currentWordIndex < words.length - 1) {
        currentWordIndex++;
        initializePuzzle();
      } else {
        feedbackElement.textContent = "Congratulations! You know him too well!";
        submitButton.disabled = true;
      }
    } else if (guessesLeft === 0) {
      feedbackElement.textContent = "Game over! Out of guesses.";
      submitButton.disabled = true;
    }
  });
  
  // Start the game
  initializePuzzle();