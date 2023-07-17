//book class
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = Boolean(read);
    }
}
Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

let bookList = document.querySelector('.books');
let library = [];

library.push(new Book("Anna Karenina", 'Leo Tolstoy', 864, true));
library.push(new Book("The Hobbit", 'J.R.R Tolkien', 300, false));
function populateLibrary() {
    library.forEach((book) => {
        addBookCard(book);
    });
}
populateLibrary();

function addBookCard(book) {
    //add a "card" for each book
    let bookCard = document.createElement('div');
    bookCard.classList.add('card');
    // set the id of the card element for the book
    bookCard.setAttribute('id', book.title.replaceAll(' ', '-'));
    for (const prop in book) {
        if (typeof book[prop] != 'function') {
            let propertyDiv = document.createElement('div');
            if (prop === 'read') {
                propertyDiv.classList.add("status");
                propertyDiv.textContent = book[prop] ? 'Read' : 'Unread';
            }
            else {
                propertyDiv.classList.add(prop.replaceAll(' ', '-'));
                propertyDiv.textContent = book[prop];
            }
            bookCard.appendChild(propertyDiv);
        }
    }

    //add action buttons for toggling read status and deletion of book
    let actions = document.createElement('div');
    actions.classList.add('actions');
    let status = document.createElement('button');
    status.innerText = book.read ? 'Unread' : 'Read';
    status.classList.add('toggle-status');
    status.addEventListener('click', (e) => {
        toggleStatus(e);
    })
    let deleteButton = document.createElement('button');
    deleteButton.classList.add("delete");
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', (e) => {
        deleteBook(e);
    });
    actions.appendChild(status);
    actions.appendChild(deleteButton);
    bookCard.appendChild(actions);
    bookList.appendChild(bookCard);
}



function deleteBook(e) {
    let id = (e.target.parentNode.parentNode.id);
    let bookToDelete = document.querySelector(`#${id}`);
    bookToDelete.remove();
    let deleteIndex = library.findIndex((book) => {
        return (book.title === (id.replaceAll('-', ' ')));
    });
    library.splice(deleteIndex, 1);
};

function toggleStatus(e) {
    let id = (e.target.parentNode.parentNode.id);
    let bookToggle = document.querySelector(`#${id} .status`);
    bookToggle.innerText = bookToggle.innerText === 'Read' ? 'Unread' : 'Read';
    let index = library.findIndex((book) => {
        return (book.title === (id.replaceAll('-', ' ')));
    });
    library[index].toggleRead();
    document.querySelector(`#${id} > .actions > .toggle-status`).innerText = bookToggle.innerText === 'Read' ? 'Unread' : 'Read';
};

//form
//hide and display form
let addButton = document.querySelector('#add-book');
addButton.addEventListener('click', (e) => {
    hideForm(e);
});

function hideForm(e) {
    let bookForm = document.querySelector('#book-form');
    if (bookForm.style.display === 'none') {
        bookForm.style.display = 'flex';
    }
    else {
        bookForm.style.display = 'none';
    }
};

let bookForm = document.querySelector('#book-form');
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //to prevent page from refreshing as soon as we submit

    addBook(e);
});

function addBook(e) {
    let title = document.querySelector('#book-title').value;
    let index = library.findIndex((book) => {
        return (book.title === title);
    });
    if (index != -1) {
        alert("Book Already In Library!")
        return;
    }

    let author = document.querySelector('#book-author').value;
    let pages = document.querySelector('#book-pages').value;
    let read = document.querySelector('#book-read').checked;
    let book = new Book(title, author, pages, read);
    addBookCard(book);
    library.push(book);
    hideForm();
}

//form submission
// light/dark theme toggler
let dark = 'rgb(0,0,0)';
let light = 'rgb(255,255,255)';
let themeToggle = document.querySelector("#toggle-theme");
themeToggle.addEventListener('click', (e) => {
    toggleTheme(e);
})

function toggleTheme(e) {
    let root = document.documentElement;
    if (getComputedStyle(root).getPropertyValue('--theme') === 'light') {
        root.style.setProperty('--theme', 'dark');
        root.style.setProperty('--bg-color', dark);
        root.style.setProperty('--font-color', light);
    }
    else {
        root.style.setProperty('--theme', 'light');
        root.style.setProperty('--bg-color', light);
        root.style.setProperty('--font-color', dark);
    }
}