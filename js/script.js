const addBookForm = document.getElementById("add-books-form");
const bookList = document.querySelector(".book-list");

let bookLists = [];

const addBook = () => {
    bookList.innerHTML = "";
    bookLists.forEach((book, index) => {
        const bookFrag = document.createRange().createContextualFragment(`
            <div>
                <p>${book.title}</p>       
                <p>${book.author}</p>
                <button>Remove</button>
                <hr>
            </div>
        `);
        bookList.append(bookFrag);
    })
}

addBookForm.addEventListener('submit', function(e){
    e.preventDefault();
    let title = document.querySelector(".titleField");
    let author = document.querySelector(".authorField");
    const newBook = {
        title: title.value,
        author: author.value
    }
    bookLists.push(newBook);
    addBook();
})