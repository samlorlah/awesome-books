const addBookForm = document.getElementById('add-books-form');
const bookList = document.querySelector('.book-list');
const displayDate = document.querySelector('.date');

class Books {
  constructor(bookLists = []) {
    this.bookLists = bookLists;
    this.getFromLocal();
  }

  removeBook(bookObject, index) {
    const bookInfo2 = document.getElementById(index);
    const { title, author } = bookObject;

    this.bookLists = this.bookLists.filter(
      (book) => book.title !== title && book.author !== author,
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

// DISPLAY DATE ON THE DOM
/* function updateTime() {
  setTimeout(() => {realTime()}, 1000);
} */

const realTime = () => {
  const date = new Date();
  const dateOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };

  const currentDate = date.toLocaleDateString('en-GB', dateOptions);
  const currentTime = date.toLocaleTimeString('en-GB', timeOptions);
  displayDate.innerHTML = `${currentDate} ${currentTime}`;

  setTimeout(() => { realTime(); }, 1000);
};

realTime();

const navLinks = Array.from(
  document.body.querySelectorAll('header nav ul li a'),
);

const sections = Array.from(document.body.querySelectorAll('section'));

navLinks.forEach((navLink) => {
  navLink.addEventListener('click', () => {
    const idForSectionToShow = navLink.getAttribute('href');
    sections.forEach((section) => {
      const id = section.getAttribute('id');
      if (`#${id}` === idForSectionToShow) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    });
  });
});
