/* PROJECT LIBRARY */

/* Library Class */
class Library {
  static totalBooks = 0;

  constructor() {
    this.books = [];
  }

  // Method to add a book
  addBook(book) {
    this.books.push(book);
    Library.totalBooks++;
  }

  // Method to remove a book
  removeBook(index) {
    this.books.splice(index, 1);
    Library.totalBooks--;
  }

  // Static method to get totalBooks
  static getTotalBooks() {
    return Library.totalBooks;
  }
}

/* Book Class */
class Book {
  #readStatus;

  constructor(title, author, pages, publicationYear, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.publicationYear = publicationYear;
    this.#readStatus = readStatus;
  }

  // Method to update readStatus
  set readStatus(newStatus) {
    this.#readStatus = newStatus;
  }

  // Getter for readStatus
  get ReadStatus() {
    return this.#readStatus;
  }
}

/* Comic Subclass */
class Comic extends Book {
  constructor(title, author, pages, publicationYear, readStatus, illustrator) {
    super(title, author, pages, publicationYear, readStatus);
    this.illustrator = illustrator;
  }
}

const myLibrary = new Library(); // Create an instance of Library

/* Function to add a book to the library */
function addBookToLibrary(title, author, pages, publicationYear, readStatus) {
  const newBook = new Book(title, author, pages, publicationYear, readStatus);
  myLibrary.addBook(newBook);
  displayBooks();
}

/* Function to handle the removal of book from library */
function removeBookFromLibrary(index) {
  myLibrary.removeBook(index);
  displayBooks();
}

/* Function to display books */
function displayBooks() {
  const libraryContainer = document.querySelector("#library-container");
  libraryContainer.innerHTML = "";

  myLibrary.books.forEach((book, index) => {
    // Create a new element for each book
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    // Add book details (title, author, etc.)
    bookCard.innerHTML = `
        <div class="book-info">
          <h3>${book.title}</h3>
          <p>Author: ${book.author}</p>
          <p>Pages: ${book.pages}</p>
          <p>Publication Year: ${book.publicationYear}</p>
          <label for="read-status-${index}">Read Status:</label>
          <select id="read-status-${index}" class="read-status">
              <option value="read" ${
                book.readStatus === "read" ? "selected" : ""
              }>Read</option>
              <option value="to-read" ${
                book.readStatus === "to-read" ? "selected" : ""
              }>To Read</option>
              <option value="currently-reading" ${
                book.readStatus === "currently-reading" ? "selected" : ""
              }>Currently Reading</option>
              <option value="did-not-finish" ${
                book.readStatus === "did-not-finish" ? "selected" : ""
              }>Did Not Finish</option>
          </select>
                  <button class="remove-book-btn" data-index="${index}">Remove Book</button>
        </div>

                <div class="book-cover">
          <img src="https://greenhousescribes.com/wp-content/uploads/2020/10/book-cover-generic.jpg" alt="Book Cover">
        </div>
        
    `;

    // Append to the library container
    libraryContainer.appendChild(bookCard);

    // Add event listener to update read status
    const readStatusSelect = bookCard.querySelector(`#read-status-${index}`);
    readStatusSelect.addEventListener("change", (e) => {
      book.readStatus = e.target.value;
    });

    // Add event listener to remove book
    const removeBookBtn = bookCard.querySelector(".remove-book-btn");
    removeBookBtn.addEventListener("click", (e) => {
      const bookIndex = e.target.getAttribute("data-index");
      removeBookFromLibrary(bookIndex);
    });
  });
}

/* Event Listeners */
document.addEventListener("DOMContentLoaded", () => {
  const addBookBtn = document.querySelector("#add-book-btn");
  const bookFormContainer = document.querySelector("#add-book-form");
  const bookForm = document.querySelector("#book-form");

  addBookBtn.addEventListener("click", () => {
    bookFormContainer.classList.toggle("hidden");
  });

  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const publicationYear = document.querySelector("#publication-year").value;
    const readStatus = document.querySelector("#read-status").value;

    addBookToLibrary(title, author, pages, publicationYear, readStatus);
    bookForm.reset();
    bookFormContainer.classList.add("hidden");
  });
});

/* TESTS */
addBookToLibrary("The Dark", "Mark Boer", 321, 2020, "read");
addBookToLibrary("VSC History", "Radu Vida", 141, 2021, "to-read");
addBookToLibrary("Old World", "Andrea Rhorn", 243, 2019, "currently-reading");
addBookToLibrary("CSS Secrets", "Cosimus Voss", 643, 2015, "did-not-finish");
console.table(myLibrary);
