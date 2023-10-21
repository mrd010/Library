class Book {
  #title;
  #author;
  #pages;
  #readStatus;
  #indexInLibrary;

  constructor(title, author, pages, readStatus = false) {
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
    this.#readStatus = readStatus;
  }

  get Title() {
    return this.#title;
  }
  get Author() {
    return this.#author;
  }
  get Pages() {
    return this.#pages;
  }
  get ReadStatus() {
    return this.#readStatus;
  }
  get IndexInLibrary() {
    return this.#indexInLibrary;
  }
  set IndexInLibrary(index) {
    this.#indexInLibrary = index;
  }

  addToLibrary(library) {
    library.Books.push(this);
  }

  removeFromLibrary(library) {
    library.Books.splice(library.Books.indexOf(this), 1);
  }

  readBook(readStatus = true) {
    this.#readStatus = readStatus;
  }
}

class Library {
  static #books = [];

  static get Length() {
    return this.#books.length;
  }

  static get Books() {
    return this.#books;
  }

  static addBook(book) {
    book.IndexInLibrary = this.#books.length;
    this.#books.push(book);
  }

  static removeBook(book) {
    this.#books.splice(this.#books.indexOf(book), 1);
  }

  static readBook(book, readStatus = true) {
    this.#books[this.#books.indexOf(book)].ReadStatus = readStatus;
  }
}

class DisplayController {
  static #enterMainPage() {
    const firstPage = document.querySelector(".first-page");
    const secondPage = document.querySelector(".second-page");
    let s = window.getComputedStyle(document.body);
    let w = s.getPropertyValue("width").slice(0, -2);

    document.body.style.backgroundPosition = "right";
    firstPage.style.cssText = `left:-${2844 - w}px; opacity:0; z-index:-1`;
    secondPage.style.cssText = `right:0; opacity:1`;
    document.body.style.overflowY = "auto";
  }

  static #showNewBookMenu() {
    const mainContainer = document.querySelector(
      ".second-page .main-container"
    );
    const newBookMenu = document.querySelector(".second-page .new-book-menu");
    if (this.checked) {
      newBookMenu.style.right = "0";
      mainContainer.style.paddingRight = "333px";
    } else {
      newBookMenu.style.right = "-334px";
      mainContainer.style.paddingRight = "0";
    }
  }

  static #addNewBook(e) {
    const newBookFormInputs = document.querySelectorAll(".new-book-form input");
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

    Library.addBook(book);

    DisplayController.#createDOMLibrary();

    e.preventDefault();
  }

  static #createDOMLibrary() {
    const mainContainer = document.querySelector(
      ".second-page .main-container"
    );
    let libraryContainer = mainContainer.querySelector("main.library");
    mainContainer.removeChild(libraryContainer);

    libraryContainer = document.createElement("main");
    libraryContainer.classList.add("library");

    if (Library.Length) {
      Library.Books.forEach((book) => {
        let bookCard = DisplayController.#createDOMBookCard(book);

        libraryContainer.appendChild(bookCard);
      });
    } else {
      let empty = document.createElement("p");
      empty.classList.add("empty-message");
      empty.textContent = "Oops!!! Looks like there is no book to read.";
      libraryContainer.appendChild(empty);
    }

    mainContainer.appendChild(libraryContainer);

    const readButtons = mainContainer.querySelectorAll(
      '.book-card .button-row input[type="checkbox"]'
    );
    readButtons.forEach((readBtn) => {
      readBtn.addEventListener("change", DisplayController.#toggleRead);
    });
    // ---
    const removeButtons = mainContainer.querySelectorAll(
      ".book-card .button-row button"
    );
    removeButtons.forEach((removeBtn) => {
      removeBtn.addEventListener("click", DisplayController.#removeBook);
    });
  }

  static #toggleRead() {
    const index = this.getAttribute("data-index");
    Library.Books[index].readBook(this.checked);
  }

  static #removeBook() {
    const index = this.getAttribute("data-index");
    Library.removeBook(Library.Books[index]);
    DisplayController.#createDOMLibrary();
  }

  static initializeDisplay() {
    const enterBtn = document.querySelector(".first-page-enter-button");
    enterBtn.addEventListener("click", this.#enterMainPage);

    const showMenuCheck = document.querySelector(".second-page #show-menu");
    showMenuCheck.addEventListener(
      "change",
      DisplayController.#showNewBookMenu
    );

    const newBookForm = document.querySelector(".new-book-form");
    newBookForm.addEventListener("submit", DisplayController.#addNewBook);

    // initialize library
    Library.addBook(
      new Book("The White Gold Wielder", "Stephen R. Donaldson", 260)
    );
    Library.addBook(
      new Book("My Side of the Mountain", "Jean Craighead George", 657)
    );
    Library.addBook(new Book("Seduction in Death", "J.D. Robb", 540));
    // initialize library end
    DisplayController.#createDOMLibrary();
  }

  // Create Card Book Div
  /////////////////////////////////////////////////////
  static #createDOMBookCard(book) {
    let newBookCard = document.createElement("div");
    newBookCard.classList.add("book-card");
    newBookCard.setAttribute("data-index", book.IndexInLibrary);

    let newCardRow = document.createElement("div");
    newCardRow.classList.add("book-card-row");
    newCardRow.classList.add("info-row");

    let newCardRowSpan = document.createElement("span");
    newCardRowSpan.classList.add("material-symbols-outlined");
    newCardRowSpan.textContent = " book_5 ";
    newCardRow.appendChild(newCardRowSpan);

    newCardRowSpan = document.createElement("span");
    newCardRowSpan.classList.add("book-title");
    newCardRowSpan.textContent = book.Title;
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
    newCardRowSpan.textContent = book.Author;
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
    newCardRowSpan.textContent = book.Pages;
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
    hiddenCheckbox.setAttribute("id", `read-check${book.IndexInLibrary}`);
    hiddenCheckbox.setAttribute("data-index", book.IndexInLibrary);
    hiddenCheckbox.style.display = "none";
    hiddenCheckbox.checked = book.ReadStatus;
    newCardRow.appendChild(hiddenCheckbox);

    let newCardRowLabel = document.createElement("label");
    newCardRowLabel.classList.add("book-card-read-button");
    newCardRowLabel.classList.add("button");
    newCardRowLabel.setAttribute("for", `read-check${book.IndexInLibrary}`);

    newCardRowSpan = document.createElement("span");
    newCardRowSpan.classList.add("button-text");
    if (book.ReadStatus) {
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

    let newCardButton = document.createElement("button");
    newCardButton.classList.add("book-card-remove-button");
    newCardButton.classList.add("button");
    newCardButton.setAttribute("data-index", book.IndexInLibrary);

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
  }
}

DisplayController.initializeDisplay();
