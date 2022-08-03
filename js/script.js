const addBookForm = document.getElementById('add-books-form');
const bookList = document.querySelector('.book-list');

class Books {
  constructor(bookLists = []) {
    this.bookLists = bookLists;
    this.getFromLocal();
  }

  removeBook(bookObject, index) {
    const bookInfo2 = document.getElementById(index);
    const { title, author } = bookObject;

    this.bookLists = this.bookLists.filter(
      (book) => book.title !== title && book.author !== author
    );
    localStorage.setItem('booksCollection', JSON.stringify(this.bookLists));
    bookList.removeChild(bookInfo2);
  }

  displayBook(bookObject, index) {
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
      this.removeBook(bookObject, index);
    };
  }

  addBook(bookObject) {
    this.bookLists.push(bookObject);

    localStorage.setItem('booksCollection', JSON.stringify(this.bookLists));

    this.displayBook(bookObject, this.bookLists.length - 1);
  }

  getFromLocal() {
    // check local storage before adding a book
    if (localStorage.getItem('booksCollection')) {
      this.bookLists = JSON.parse(localStorage.getItem('booksCollection'));

      this.bookLists.forEach((book, index) => {
        this.displayBook(book, index);
      });
    } else {
      localStorage.setItem('booksCollection', '');
      this.bookLists = [];
    }
  }
}

const books = new Books();

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('.titleField');
  const author = document.querySelector('.authorField');

  if (title.value !== '' && author.value !== '') {
    const newBook = {
      title: title.value,
      author: author.value,
    };

    books.addBook(newBook);
  }
});
