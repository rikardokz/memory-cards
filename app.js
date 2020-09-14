const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// keep track of current card
let currentActiveCard = 0;

// store DOM cards
const cardsEl = [];

// store card data
const cardsData = getCardsData();
/* const cardsData = [
  {
    question: "What must a variable begin with?",
    answer: "A letter, $ or _",
  },
  {
    question: "What is a variable?",
    answer: "Container for a piece of data",
  },
  {
    question: "Example of Case Sensitive Variable",
    answer: "thisIsAVariable",
  },
]; */

// create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// create a card in the DOM
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  // if the 0 index, is the card that will appear on the DOM by default
  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
  <div class="inner-card">
   <div class="inner-card-front">
    <p>${data.question}</p>
   </div>
  <div class="inner-card-back">
    <p>${data.answer}</p>
  </div>
 </div>
  `;
  // it changes from question to answer on the CSS
  card.addEventListener("click", () => card.classList.toggle("show-answer"));
  // Pushes it to cardsEl
  cardsEl.push(card);
  // adds it to the DOM (after calling this function elsewhere)
  cardsContainer.appendChild(card);

  updateCurrentText();
}

// updates the text on the pagination.
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// get cards from localstorage;
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

createCards();

//add event listeners.

// next card
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

// previous card
prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

// show add card box
showBtn.addEventListener("click", () => addContainer.classList.add("show"));

// hide add card box
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

// add new card button
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = {
      question,
      answer,
    };

    createCard(newCard);

    questionEl.value = "";
    answerEl.value = "";

    addContainer.classList.remove("show");

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// Clear all cards
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});

// next steps:
// add a delete button in each card.
// add a validation, that turns red when value is empty.
