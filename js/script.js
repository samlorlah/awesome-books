const addBookForm = document.getElementById("add-books-form");
const bookList = document.querySelector(".book-list");

let bookLists = [];
let newBook; // variable for book object that's pushed in array
let title;
let author;

function addBook(bookObject){
  bookLists.push(bookObject);

  localStorage.setItem('booksCollection', JSON.stringify(bookLists));
  title.value = '';
  author.value = '';
  
  displayBook(bookObject, bookLists.length - 1);
}

function displayBook(bookObject, index){
  const bookInfo = document.createElement('div');
  bookInfo.classList = 'bookInfo';
  bookInfo.id = index;

  bookInfo.innerHTML = `
    <p class="book-name">${newBook.title}</p>
    <p class="book-author">${newBook.author}</p>
  `;

  const removeBtn = document.createElement('button');
  removeBtn.classList = 'remove-btn';
  removeBtn.innerText = 'Remove';

  const hrLine = document.createElement('hr');

  bookInfo.appendChild(removeBtn);
  bookInfo.appendChild(hrLine);
  bookList.prepend(bookInfo);
}

addBookForm.addEventListener('submit', function(e){
  e.preventDefault();
  
  title = document.querySelector(".titleField");
  author = document.querySelector(".authorField");
  
  newBook = {
    title: title.value,
    author: author.value
  }

  addBook(newBook);
});