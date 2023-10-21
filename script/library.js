const enterBtn = document.querySelector(".first-page-enter-button");
const firstPage = document.querySelector(".first-page");
const secondPage = document.querySelector(".second-page");
const mainContainer = secondPage.querySelector(".main-container");

enterBtn.addEventListener("click", () => {
  let s = window.getComputedStyle(document.body);
  let w = s.getPropertyValue("width").slice(0, -2);

  document.body.style.backgroundPosition = "right";
  firstPage.style.cssText = `left:-${2844 - w}px; opacity:0; z-index:-1`;
  secondPage.style.cssText = `right:0; opacity:1`;
  document.body.style.overflowY = "auto";
});

const newBookMenu = secondPage.querySelector(".new-book-menu");
const showMenuCheck = secondPage.querySelector("#show-menu");

showMenuCheck.addEventListener("change", showNewBookMenu);

function showNewBookMenu() {
  if (this.checked) {
    newBookMenu.style.right = "0";
    mainContainer.style.paddingRight = "333px";
  } else {
    newBookMenu.style.right = "-334px";
    mainContainer.style.paddingRight = "0";
  }
}

// library
const newBookForm = newBookMenu.querySelector(".new-book-form");
const newBookFormInputs = newBookForm.querySelectorAll("input");
let readButtons;
let removeButtons;

newBookForm.addEventListener("submit", addNewBook);

// Library Constructor
function Library(books) {
  this.books = books;
}

Library.prototype.addBook = function (book) {
  book.indexInLibrary = this.books.length;
  this.books.push(book);
};

Library.prototype.removeBook = function (book) {
  this.books.splice(this.books.indexOf(book), 1);
  this.books.forEach((item, index) => (item.indexInLibrary = index));
};

Library.prototype.readBook = function (book, readStatus = true) {
  this.books[this.indexOf(book)].readStatus = readStatus;
};

// book constructor
function Book(title, author, pages, readStatus = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.addToLibrary = function (library) {
  library.books.push(this);
};

Book.prototype.removeFromLibrary = function (library) {
  library.books.splice(library.indexOf(this), 1);
};

Book.prototype.readBook = function (readStatus = true) {
  this.readStatus = readStatus;
};

// Create Card Book Div
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

Book.prototype.createDOMBookCard = function () {
  let newBookCard = document.createElement("div");
  newBookCard.classList.add("book-card");
  newBookCard.setAttribute("data-index", this.indexInLibrary);

  let newCardRow = document.createElement("div");
  newCardRow.classList.add("book-card-row");
  newCardRow.classList.add("info-row");

  let newCardRowSpan = document.createElement("span");
  newCardRowSpan.classList.add("material-symbols-outlined");
  newCardRowSpan.textContent = " book_5 ";
  newCardRow.appendChild(newCardRowSpan);

  newCardRowSpan = document.createElement("span");
  newCardRowSpan.classList.add("book-title");
  newCardRowSpan.textContent = this.title;
  newCardRow.appendChild(newCardRowSpan);
  newBookCard.appendChild(newCardRow);
  // ----------

  newCardRow = document.createElement("div");
  newCardRow.classList.add("book-card-row");
  newCardRow.classList.add("info-row");

  newCardRowSpan = document.createElement("span");
  newCardRowSpan.classList.add("material-symbols-outlined");
  newCardRowSpan.textContent = " history_edu ";
  newCardRow.appendChild(newCardRowSpan);

  newCardRowSpan = document.createElement("span");
  newCardRowSpan.classList.add("book-author");
  newCardRowSpan.textContent = this.author;
  newCardRow.appendChild(newCardRowSpan);
  newBookCard.appendChild(newCardRow);
  // ---------

  newCardRow = document.createElement("div");
  newCardRow.classList.add("book-card-row");
  newCardRow.classList.add("info-row");

  newCardRowSpan = document.createElement("span");
  newCardRowSpan.classList.add("material-symbols-outlined");
  newCardRowSpan.textContent = " auto_stories ";
  newCardRow.appendChild(newCardRowSpan);

  newCardRowSpan = document.createElement("span");
  newCardRowSpan.classList.add("book-pages");
  newCardRowSpan.textContent = this.pages;
  newCardRow.appendChild(newCardRowSpan);

  newCardRowSpan = document.createElement("span");
  newCardRowSpan.textContent = "pages";
  newCardRow.appendChild(newCardRowSpan);
  newBookCard.appendChild(newCardRow);
  // -----------

  newCardRow = document.createElement("div");
  newCardRow.classList.add("book-card-row");
  newCardRow.classList.add("button-row");

  let hiddenCheckbox = document.createElement("input");
  hiddenCheckbox.setAttribute("type", "checkbox");
  hiddenCheckbox.setAttribute("id", `read-check${this.indexInLibrary}`);
  hiddenCheckbox.setAttribute("data-index", this.indexInLibrary);
  hiddenCheckbox.style.display = "none";
  hiddenCheckbox.checked = this.readStatus;
  newCardRow.appendChild(hiddenCheckbox);

  let newCardRowLabel = document.createElement("label");
  newCardRowLabel.classList.add("book-card-read-button");
  newCardRowLabel.classList.add("button");
  newCardRowLabel.setAttribute("for", `read-check${this.indexInLibrary}`);

  newCardRowSpan = document.createElement("span");
  newCardRowSpan.classList.add("button-text");
  if (this.readStatus) {
    newCardRowSpan.textContent = "book is Read";
  } else {
    newCardRowSpan.textContent = "Read Book";
  }
  newCardRowLabel.appendChild(newCardRowSpan);

  newCardRowSpan = document.createElement("span");
  newCardRowSpan.classList.add("material-symbols-outlined");
  newCardRowSpan.classList.add("button-done");
  newCardRowSpan.textContent = " done_all ";
  newCardRowLabel.appendChild(newCardRowSpan);
  newCardRow.appendChild(newCardRowLabel);
  newBookCard.appendChild(newCardRow);
  // ----------------

  newCardRow = document.createElement("div");
  newCardRow.classList.add("book-card-row");
  newCardRow.classList.add("button-row");

  newCardButton = document.createElement("button");
  newCardButton.classList.add("book-card-remove-button");
  newCardButton.classList.add("button");
  newCardButton.setAttribute("data-index", this.indexInLibrary);

  newCardRowSpan = document.createElement("span");
  newCardRowSpan.classList.add("button-text");
  newCardRowSpan.textContent = "Remove Book";
  newCardButton.appendChild(newCardRowSpan);

  newCardRowSpan = document.createElement("span");
  newCardRowSpan.classList.add("material-symbols-outlined");
  newCardRowSpan.textContent = " close ";
  newCardButton.appendChild(newCardRowSpan);
  newCardRow.appendChild(newCardButton);
  newBookCard.appendChild(newCardRow);
  // ------------

  return newBookCard;
};

function addNewBook(e) {
  const inputs = Array.of(newBookFormInputs)[0];

  let book = new Book(
    inputs[0].value,
    inputs[1].value,
    inputs[2].value,
    inputs[3].checked
  );

  inputs[0].value = "";
  inputs[1].value = "";
  inputs[2].value = "";
  inputs[3].checked = false;

  myLibrary.addBook(book);

  createDOMLibrary(myLibrary);

  e.preventDefault();
}

function createDOMLibrary(library) {
  let libraryContainer = mainContainer.querySelector("main.library");
  mainContainer.removeChild(libraryContainer);

  libraryContainer = document.createElement("main");
  libraryContainer.classList.add("library");

  if (library.books.length) {
    library.books.forEach((book) => {
      let bookCard = book.createDOMBookCard();
      libraryContainer.appendChild(bookCard);
    });
  } else {
    let empty = document.createElement("p");
    empty.classList.add("empty-message");
    empty.textContent = "Ooops!!! Looks like there is no book to read.";
    libraryContainer.appendChild(empty);
  }

  mainContainer.appendChild(libraryContainer);

  readButtons = mainContainer.querySelectorAll(
    '.book-card .button-row input[type="checkbox"]'
  );
  readButtons.forEach((readBtn) => {
    readBtn.addEventListener("change", toggleRead);
  });
  // ---
  removeButtons = mainContainer.querySelectorAll(
    ".book-card .button-row button"
  );
  removeButtons.forEach((removeBtn) => {
    removeBtn.addEventListener("click", removeBook);
  });
}

function toggleRead() {
  const index = this.getAttribute("data-index");
  myLibrary.books[index].readBook(this.checked);
}

function removeBook() {
  const index = this.getAttribute("data-index");
  myLibrary.removeBook(myLibrary.books[index]);
  createDOMLibrary(myLibrary);
}

// initialize library
let myLibrary = new Library([]);

myLibrary.addBook(
  new Book("The White Gold Wielder", "Stephen R. Donaldson", 260)
);
myLibrary.addBook(
  new Book("My Side of the Mountain", "Jean Craighead George", 657)
);
myLibrary.addBook(new Book("Seduction in Death", "J.D. Robb", 540));
// initialize library end

createDOMLibrary(myLibrary);
