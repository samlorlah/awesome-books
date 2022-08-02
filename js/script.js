const addBookForm = document.getElementById('add-books-form');
const bookList = document.querySelector('.book-list');

const storedBooks = JSON.parse(localStorage.getItem('booksCollection'));
let bookLists = storedBooks || [];
let newBook; // variable for book object that's pushed in array
let title;
let author;

function removeBook(bookObject, index) {
  const bookInfo2 = document.getElementById(index);
  const { title, author } = bookObject;

  bookLists = bookLists.filter((book) => book.title !== title && book.author !== author);
  localStorage.setItem('booksCollection', JSON.stringify(bookLists));
  bookList.removeChild(bookInfo2);
}

function displayBook(bookObject, index) {
  const bookInfo = document.createElement('div');
  bookInfo.classList = 'bookInfo';
  bookInfo.id = index;

  bookInfo.innerHTML = `
    <p class="book-name">${bookObject.title}</p>
    <p class="book-author">${bookObject.author}</p>
  `;

  const removeBtn = document.createElement('button');
  removeBtn.classList = 'remove-btn';
  removeBtn.innerText = 'Remove';

  const hrLine = document.createElement('hr');

  bookInfo.appendChild(removeBtn);
  bookInfo.appendChild(hrLine);
  bookList.prepend(bookInfo);

  removeBtn.onclick = () => {
    removeBook(bookObject, index);
  };
}

function addBook(bookObject) {
  bookLists.push(bookObject);

  localStorage.setItem('booksCollection', JSON.stringify(bookLists));
  title.value = '';
  author.value = '';

  displayBook(bookObject, bookLists.length - 1);
}

// check local storage before adding a book
if (localStorage.getItem('booksCollection')) {
  bookLists = JSON.parse(localStorage.getItem('booksCollection'));

  bookLists.forEach((book, index) => {
    displayBook(book, index);
  });
} else {
  localStorage.setItem('booksCollection', '');
  bookLists = [];
}

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  title = document.querySelector('.titleField');
  author = document.querySelector('.authorField');

  if
  (title.value !== '' && author.value !== '') {
    newBook = {
      title: title.value,
      author: author.value,
    };

    addBook(newBook);

    title.value = '';
    author.value = '';
  }
});