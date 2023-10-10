// honestly should just use react probably but i don't want to

var cardinner;
var inputfield;
var cardfront;
var cardback;
var fronttext;
var backtext;

// this is such bad design
var state = 0;

var cards;

var submitbutton = document.getElementById("submitbutton");
var inputcards = document.getElementById("inputcards");
submitbutton.addEventListener("click", () => {
  startQuiz(inputcards.value);
})

function startQuiz (txt) {
  cards = makeQuizSet(txt);
  submitbutton.parentNode.replaceChildren(...[
elementFromHtml(`<div id="card">
  <div id="card-inner">
    <div id="card-front">
      <b id="front-text">${cards.pairs[cards.i][0]}</b>
    </div>
    <div id="card-back">
      <b id="back-text">${cards.pairs[cards.i][1]}</b>
    </div>
  </div>
</div>`), elementFromHtml(`<input id="inputfield"></input>`)]);
cardinner = document.getElementById("card-inner");
inputfield = document.getElementById("inputfield");
cardfront = document.getElementById("card-front");
cardback = document.getElementById("card-back");
fronttext = document.getElementById("front-text");
backtext = document.getElementById("back-text");
inputfield.addEventListener("keyup", ({key}) => {
  if (key === "Enter") {
    if (state == 0) {
      cardinner.classList.toggle("flip");
      backtext.classList.remove("hidden");
      if (inputfield.value.trim().toLowerCase() === cards.pairs[cards.i][1].toLowerCase()) 
        backtext.classList.add("correct");
      else
        backtext.classList.add("incorrect");
      
      state++;
    } else if (state == 1) {
      backtext.classList.remove("correct");
      backtext.classList.remove("incorrect");
      backtext.classList.add("hidden");
      cardinner.classList.toggle("flip");
      cards.i++;
      fronttext.textContent = cards.pairs[cards.i][0];
      backtext.textContent = cards.pairs[cards.i][1];
      inputfield.value = "";
      state = 0;
    } 
  }
})
}

function uploadFile(file) {
  file.text().then((value) => {
    startQuiz(value);
  })
}

// make quiz set object out of string
function makeQuizSet (cards) {
  var trimmed = cards.trim();
  var splitnewl = trimmed.split(/\r?\n/);
  for (var i = 0; i < splitnewl.length; i++) {
    splitnewl[i] = splitnewl[i].split(",", 2);
  }
  for (var i = 0; i < splitnewl.length; i++) 
    for (var j = 0; j < 2; j++)
      splitnewl[i][j] = splitnewl[i][j].trim();
  
  return {
    pairs: splitnewl,
    i: 0
  }
}

// From stackoverflow lol
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function elementFromHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}
