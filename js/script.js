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
            book.ReadStatus === "read" ? "selected" : ""
          }>Read</option>
          <option value="to-read" ${
            book.ReadStatus === "to-read" ? "selected" : ""
          }>To Read</option>
          <option value="currently-reading" ${
            book.ReadStatus === "currently-reading" ? "selected" : ""
          }>Currently Reading</option>
          <option value="did-not-finish" ${
            book.ReadStatus === "did-not-finish" ? "selected" : ""
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

  // Toggle visibility of the form
  addBookBtn.addEventListener("click", () => {
    bookFormContainer.classList.toggle("hidden");
  });

  // Helper function to validate individual fields
  function validateField(field, errorMessage) {
    const value = field.value.trim(); // Trim whitespace
    if (!value) {
      field.setCustomValidity(errorMessage); // Set custom error message
      return false;
    }
    field.setCustomValidity(""); // Clear any previous error
    return true;
  }

  // Handle form submission
  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get references to the input elements
    const titleInput = document.querySelector("#title");
    const authorInput = document.querySelector("#author");
    const pagesInput = document.querySelector("#pages");
    const publicationYearInput = document.querySelector("#publication-year");
    const readStatusInput = document.querySelector("#read-status");

    // Reset custom validity messages and clear error messages
    titleInput.setCustomValidity("");
    authorInput.setCustomValidity("");
    pagesInput.setCustomValidity("");
    publicationYearInput.setCustomValidity("");

    document.querySelector("#title-error").textContent = "";
    document.querySelector("#author-error").textContent = "";
    document.querySelector("#pages-error").textContent = "";
    document.querySelector("#publicationYear-error").textContent = "";

    // Validate each field
    let isTitleValid = validateField(titleInput, "Title is required.");
    if (!isTitleValid) {
      document.querySelector("#title-error").textContent =
        titleInput.validationMessage;
    }

    let isAuthorValid = validateField(authorInput, "Author is required.");
    if (!isAuthorValid) {
      document.querySelector("#author-error").textContent =
        authorInput.validationMessage;
    }

    let isPagesValid = validateField(
      pagesInput,
      "Number of pages is required."
    );
    if (
      isPagesValid &&
      (isNaN(pagesInput.value) || Number(pagesInput.value) <= 0)
    ) {
      pagesInput.setCustomValidity(
        "Number of pages must be a positive number."
      );
      isPagesValid = false;
    }
    if (!isPagesValid) {
      document.querySelector("#pages-error").textContent =
        pagesInput.validationMessage;
    }

    let isPublicationYearValid = validateField(
      publicationYearInput,
      "Publication year is required."
    );
    if (isPublicationYearValid) {
      const yearValue = Number(publicationYearInput.value);
      if (
        isNaN(yearValue) ||
        yearValue < 1000 ||
        yearValue > new Date().getFullYear()
      ) {
        publicationYearInput.setCustomValidity(
          "Publication year must be a valid year between 1000 and the current year."
        );
        isPublicationYearValid = false;
      }
    }
    if (!isPublicationYearValid) {
      document.querySelector("#publicationYear-error").textContent =
        publicationYearInput.validationMessage;
    }

    // Check if all fields are valid
    if (
      isTitleValid &&
      isAuthorValid &&
      isPagesValid &&
      isPublicationYearValid
    ) {
      // If valid, proceed with form submission
      const titleValue = titleInput.value.trim();
      const authorValue = authorInput.value.trim();
      const pagesValue = Number(pagesInput.value);
      const publicationYearValue = Number(publicationYearInput.value);
      const readStatusValue = readStatusInput.value;

      addBookToLibrary(
        titleValue,
        authorValue,
        pagesValue,
        publicationYearValue,
        readStatusValue
      );
      bookForm.reset();
      bookFormContainer.classList.add("hidden");

      // Clear error messages after successful submission
      document.querySelector("#title-error").textContent = "";
      document.querySelector("#author-error").textContent = "";
      document.querySelector("#pages-error").textContent = "";
      document.querySelector("#publicationYear-error").textContent = "";
    } else {
      // Show error messages
      bookForm.reportValidity();
    }
  });
});

/* TESTS */
addBookToLibrary("The Dark", "Mark Boer", 321, 2020, "read");
addBookToLibrary("VSC History", "Radu Vida", 141, 2021, "to-read");
addBookToLibrary("Old World", "Andrea Rhorn", 243, 2019, "currently-reading");
addBookToLibrary("CSS Secrets", "Cosimus Voss", 643, 2015, "did-not-finish");
console.table(myLibrary);
