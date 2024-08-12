//this var reterives data from the local storage
var contentArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
//reteriving all the elements created in html file and assigning them functions
document.getElementById("save_card").addEventListener("click", () => {
  addFlashcard();
});

document.getElementById("del_all_cards").addEventListener("click", () => {
  localStorage.clear();
  flashcards.innerHTML = "";
  contentArray = [];
});

document.getElementById("show_card_box").addEventListener("click", () => {
  document.getElementById("gen_card").style.display = "block";
});

document.getElementById("close_card_box").addEventListener("click", () => {
  document.getElementById("gen_card").style.display = "none";
});

//Creating a function that will create element in the dom from div to headings.
flashcardMaker = (text, delThisIndex) => {
  const flashcard = document.createElement("div");
  const question = document.createElement("h2");
  const answer = document.createElement("h2");
  const del = document.createElement("i");

  flashcard.className = "flashcard";
  //setting attributes for the flashcard labels
  question.setAttribute(
    "style",
    "border-top: 1px solid red; padding:15px; margin-top: 30px"
  );
  question.textContent = text.my_question;

  answer.setAttribute(
    "style",
    "text-align:center; display:flex; flex-wrap:wrap; justify-content:flex-start; color:green"
  );
  answer.textContent = text.my_answer;

  del.className = "fas fa-minus";
  del.addEventListener("click", () => {
    contentArray.splice(delThisIndex, 1);
    localStorage.setItem("items", JSON.stringify(contentArray));
    window.location.reload();
  });

  flashcard.appendChild(question);
  flashcard.appendChild(answer);
  flashcard.appendChild(del);

  //Create delete button on each flashcard
  const delButton = document.createElement("button");
  delButton.textContent = "Delete";
  delButton.style.cssText =
    "display: block; margin: auto; margin-top: 50px; padding: 8px 12px;";
  delButton.addEventListener("click", (noRepeat) => {
    noRepeat.stopPropagation(); //disable the flashcard click event
    contentArray.splice(delThisIndex, 1);
    localStorage.setItem("items", JSON.stringify(contentArray));
    window.location.reload();
  });
  flashcard.appendChild(delButton);

  document.querySelector("#flashcards").appendChild(flashcard);
};
contentArray.forEach(flashcardMaker);

//this function will add a card to the screen.
addFlashcard = () => {
  const question = document.querySelector("#question");
  const answer = document.querySelector("#answer");

  //validate if the textarea is empty
  if (question.value.trim() === " " || answer.value.trim() === "") {
    alert("Both question and answer fields must be filled out.");
    return;
  }

  var flashcard_value = {
    my_question: question.value,
    my_answer: answer.value,
  };
  contentArray.push(flashcard_value);
  localStorage.setItem("items", JSON.stringify(contentArray));
  flashcardMaker(
    contentArray[contentArray.length - 1],
    contentArray.length - 1
  );
  question.value = "";
  answer.value = "";
};
