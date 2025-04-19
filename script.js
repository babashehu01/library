let libraryBooks = []

function Book(author, title, num_pages, rating, read) {
    this.id = crypto.randomUUID();
    this.author = `Author: ${author}`;
    this.title = `Title: ${title}`;
    this.num_pages = `Pages: ${num_pages}`;
    this.rating = `Rating: ${rating}`;
    this.read = `Read: ${read ? "Read" : "Not read"}`;
}

function addBookToLibrary(author, title, num_pages, rating, read) {
    let book = new Book(author, title, num_pages, rating, read);
    libraryBooks.push(book);
    return book;
}

addBookToLibrary('Brian Tracy', 'The Psychology of Selling', 257, 9, true);
addBookToLibrary('Vic Johnson', 'You Become what you thin about', 186, 8, true);

// DISPLAY THE BOOKS
function renderDisplay(libraryBooks) {
    libraryBooks.forEach(book => {
        displayBook(book);
    });
}

function displayBook(book) {
    // Cerate Book Block
    const div = document.createElement('div');
    const book_cover = document.createElement('div');
    const buttons = document.createElement('div');
    const read = document.createElement('p');
    const delete_btn = document.createElement('button');
    delete_btn.dataset.id = book.id;
    // IMPLEMENT DELETE HERE
    delete_btn.addEventListener("click", () => {
        libraryBooks = libraryBooks.filter((book) => book.id != delete_btn.dataset.id);
        div.remove();
        console.log(libraryBooks);
    });
    const read_btn = document.createElement('button');
    read_btn.dataset.id = book.id;
    // Implement Read Status
    read_btn.addEventListener("click", () => {
        read_btn.textContent = (read.textContent === "Read: Read" ? "Read?" : "Not Read?");
        read.textContent = (read.textContent === "Read: Not read" ? "Read: Read" : "Read: Not read"); 
    });
    const author = document.createElement('p');
    const title = document.createElement('p');
    const num_pages = document.createElement('p');
    const rating = document.createElement('p');
    div.className = "book";
    // APPEND CONTENTS
    delete_btn.textContent = "Delete";
    delete_btn.className = "delete_btn";
    read.textContent = book.read;
    read_btn.textContent = (read.textContent === "Read: Read" ? "Not Read?" : "Read?");
    read_btn.className = "read_btn";
    book_cover.textContent = "#1";
    author.textContent = book.author;
    title.textContent = book.title;
    num_pages.textContent = book.num_pages;
    rating.textContent = book.rating;
    buttons.className = "buttons";
    buttons.append(delete_btn, read_btn);
    div.append(book_cover, title, author, num_pages, rating, read, buttons);
    // Append Book
    let books = document.querySelector('.books');
    books.appendChild(div);
}

// ADD NEW BOOK
const dialog = document.querySelector('dialog');
const newBookBTN = document.querySelector('#new-book');
const close = document.querySelector('#close');
const submit = document.querySelector('#submit');
let author = document.querySelector('#author');
let title = document.querySelector('#title');
let num_pages = document.querySelector('#num_pages');
let rating = document.querySelector('#rating');
let dialog_read = document.querySelector('input#read');
const form = document.querySelector('form');

newBookBTN.addEventListener("click", () => {
    dialog.showModal();
});

close.addEventListener("click", () => {
    dialog.close();
});

submit.addEventListener("click", (e) => {
    e.preventDefault();

    if(!form.checkValidity()) {
        form.reportValidity();
        return
    }

    const formData = new FormData(form);
    author = formData.get('author');
    title = formData.get('title');
    num_pages = formData.get('num_pages');
    rating = formData.get('rating');

    let newBook = addBookToLibrary(author, title, num_pages, rating, dialog_read.checked);
    displayBook(newBook);
    dialog.close();
    form.reset();
});

renderDisplay(libraryBooks);

/** I WILL LIKE TO IMPLEMENT THE DELETE AND READ BOOK METHOD
USING EVENT PROPAGATION.
INSTEAD OF ADDING INDIVIDUAL EVENT LISTENERS FOR EACH BUTTON.
HOWEVER, I HAVE VERY LITTLE KNOWLEDGE ON EVENT PROPAGATIONS, AND I HAVE 
NEVER IMPLEMENTED ONE BEFORE, AND I HAVE VERY LITTLE TIME. BUT SOON I WILL COME TO IMPROVE INSHA'ALLAH.
*/
