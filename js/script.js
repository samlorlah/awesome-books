const addBookForm = document.getElementById('add-books-form');
const bookList = document.querySelector('.book-list');

let bookLists = [];
let newBook; // variable for book object that's pushed in array
let title;
let author;


class Books {
  static removeBook(bookObject, index) {
    const bookInfo2 = document.getElementById(index);
    const { title, author } = bookObject;
  
    bookLists = bookLists.filter((book) => book.title !== title && book.author !== author);
    localStorage.setItem('booksCollection', JSON.stringify(bookLists));
    bookList.removeChild(bookInfo2);
  }
  
  static displayBook(bookObject, index) {
    const bookInfo = document.createElement('div');
    bookInfo.classList = 'bookInfo';
    bookInfo.id = index;
  
    bookInfo.innerHTML = `
      <p class="book-details">"${bookObject.title}" by ${bookObject.author}</p>
    `;
  
  
    const removeBtn = document.createElement('button');
    removeBtn.classList = 'remove-btn';
    removeBtn.innerText = 'Remove';
  
    bookInfo.appendChild(removeBtn);
    bookList.prepend(bookInfo);
  
    removeBtn.onclick = () => {
      Books.removeBook(bookObject, index);
    };
  }
  
  static addBook(bookObject) {
    bookLists.push(bookObject);
  
    localStorage.setItem('booksCollection', JSON.stringify(bookLists));
    title.value = '';
    author.value = '';
  
    Books.displayBook(bookObject, bookLists.length - 1);
  }
}

// check local storage before adding a book
if (localStorage.getItem('booksCollection')) {
  bookLists = JSON.parse(localStorage.getItem('booksCollection'));

  bookLists.forEach((book, index) => {
    Books.displayBook(book, index);
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

    Books.addBook(newBook);

    title.value = '';
    author.value = '';
  }
});