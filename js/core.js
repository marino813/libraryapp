let myLibrary = [];

//get modal input fields
var titleof = document.getElementById('titleof');
var authorof = document.getElementById('authorof');
var pagescount = document.getElementById('pagescount');
var coverlink = document.getElementById('linktocover');
var readtoggle = document.getElementById('readcheck');
var handleinput = document.getElementById('handledescription');

//get parent node for book cards
const contentArea = document.getElementById('contentArea');

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("addbookbutton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//get the form in "add book" modal
var bookTitle = document.forms[0];

//get the modal form
const submitButton = document.querySelector("#savebookbutton");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Create Book class
class Book {
  constructor(title, author, handleinput, pages, coverlink, haveread) {
    this.title = title;
    this.author = author;
    this.handleinput = handleinput;
    this.pages = pages;
    this.coverlink = coverlink;
    this.haveread = haveread;
  }
}

//add book to library
function addBookToLibrary() {
  //get the prototype values
  var newBook = new Book(titleof.value, authorof.value, handleinput.value, pagescount.value, coverlink.value, readtoggle.checked);

  //inject them into the library array
  myLibrary.push(newBook);
  
  //clear input values and close modal window
  modal.style.display = "none";
  titleof.value='';
  authorof.value='';
  pagescount.value='';
  coverlink.value = '';
  handleinput.value = '';
}

//get submit button in modal form
bookTitle.addEventListener('submit', (event) => {
  event.preventDefault();
  addBookToLibrary();
  let bookCounter = myLibrary.length - 1;
  createCard(myLibrary[bookCounter].coverlink, myLibrary[bookCounter].title, myLibrary[bookCounter].author, myLibrary[bookCounter].pages, myLibrary[bookCounter].handleinput, myLibrary[bookCounter].haveread, bookCounter);
});

function createCard (coverimage, titleSubtitle, bookauthor, bookpages, handle, readtog, indexNum) {
  //create card elements
  let cardDiv = document.createElement('div');
  let cardFig = document.createElement('figure');
  let cardImg = document.createElement('img')
  let figcaption = document.createElement('figcaption');
  let cardTitle = document.createElement('h2');
  let cardAuthor = document.createElement('h3');
  let cardPages = document.createElement('h3');
  let cardSnip = document.createElement('div');
  let cardrocker = document.createElement('label');
  let readcheckbox = document.createElement('input');
  let leftswitch = document.createElement('span');
  let rightswitch = document.createElement('span');
  let removebutton = document.createElement('button');
  
  //assign card elements proper classes
  cardDiv.className = 'card';
  cardFig.className = 'card__thumb';
  cardImg.className = 'card__image';
  figcaption.className = 'card__caption';
  cardTitle.className = 'card__title';
  cardAuthor.className = 'cardauthor'
  cardPages.className = 'cardpages'
  cardSnip.className = 'card__snippet';
  cardrocker.className = 'rocker rocker-small cardrocker';
  leftswitch.className = 'switch-left';
  rightswitch.className = 'switch-right';
  removebutton.className = 'card__button'

  //assign card elements proper ID (if necessary)
  readcheckbox.id = 'readcheck';
  removebutton.id = 'removeBook';

  //assign card elements proper type (if necessary)
  readcheckbox.type = 'checkbox';

  //assign card elements proper role (if necessary)
  removebutton.role = 'removeBook';

  //assign card elements text content (if necessary and not to be confused with innerHTML)
  leftswitch.textContent  = 'Read';
  rightswitch.textContent  = 'Not Read';
  removebutton.textContent  = 'Remove Book';

  //set card elements' content
  cardImg.src = coverimage;
  cardTitle.innerHTML = titleSubtitle;
  cardAuthor.innerHTML = `Author: ${bookauthor}`;
  cardPages.innerHTML = `Pages: ${bookpages}`
  cardSnip.innerHTML = handle;
  readcheckbox.checked = readtog;

  //render elements in the DOM
  contentArea.appendChild(cardDiv);
  cardDiv.appendChild(cardFig);
  cardFig.appendChild(cardImg);
  cardImg.after(figcaption);
  figcaption.appendChild(cardTitle);
  cardTitle.after(cardAuthor);
  cardAuthor.after(cardPages);
  cardPages.after(cardSnip);
  cardSnip.after(cardrocker);
  cardrocker.appendChild(readcheckbox);
  readcheckbox.after(leftswitch);
  leftswitch.after(rightswitch);
  cardrocker.after(removebutton);

  //delete book from library function
  removebutton.onclick = function() {
    cardDiv.remove();
    myLibrary.splice(indexNum, 1);
    console.log(myLibrary)
  }
}