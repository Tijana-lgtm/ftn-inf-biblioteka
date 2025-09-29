class Book {
    constructor (id, title, date, type, url, description, popularity)  {
        this.id = id;
        this.title = title;
        this.date = date;
        this.type = type
        this.url = url;
        this.description = description;
        this.popularity = popularity;
    }
}


function saveBooks(books) {
    localStorage.setItem("books", JSON.stringify(books));
}

function loadBooks() {
    let values = localStorage.getItem("books");
    if (values) {
        return JSON.parse(values);
    }
    return [];
}



function initializeBooks() {



    let books = loadBooks()
    if (books.length === 0) {
        books = [
            { id: "B1234", title: "Knjiga 1", date: "2022", url: "assets/images/book1.jpg", description: "Opis knjige 1", popularity: 4 },
            { id: "B5678", title: "Knjiga 2", date: "2021", url: "assets/images/book2.jpg", description: "Opis knjige 2", popularity: 5 },
            { id: "B9101", title: "Knjiga 3", date: "2020", url: "assets/images/book3.jpg", description: "Opis knjige 3", popularity: 3 },
            { id: "B1121", title: "Knjiga 4", date: "2019", url: "assets/images/book4.jpg", description: "Opis knjige 4", popularity: 2 },
            { id: "B3141", title: "Knjiga 5", date: "2018", url: "assets/images/book5.jpg", description: "Opis knjige 5", popularity: 5 }
        ];
        saveBooks(books)
    }
     
    createBookRows(books)
    handleFormSubmission(books)
}

function createBookRows (books) {
    let table = document.querySelector ("#tableDetails")

    table.innerHTML = ''

    for (let i=0; i<books.length; i++){

            let tr = document.createElement ("tr")

            let id = document.createElement ("td")
            let title = document.createElement ("td")
            let action = document.createElement ("button")

            id.textContent = books[i].id;
            title.textContent = books[i].title;
            action.textContent = 'Obrisi'

            tr.appendChild (id);
            tr.appendChild(title);
            tr.appendChild(action);


            action.addEventListener ('click', function () {
                clickDeleteBook(id.innerHTML)
            })

            table.appendChild(tr);

    }
}



function handleFormSubmission(books) {
    console.log('Dugme kliknuto')
    let submitBtn = document.querySelector("#addBook");

    submitBtn.addEventListener('click', function () {
        const form = document.querySelector("#booksForm");
        const formData = new FormData(form);

        const title = formData.get("title");
        const bookId = formData.get("bookId");
        const type = formData.get("type");
        const picture = formData.get("picture");

        for (let i = 0; i < books.length; i++) {
            if (title === books[i].title) {
                return;
            }
        }

        const newBook = new Book(bookId, title, null, type, picture, 'desc', 0) ;
        books.push(newBook);
        saveBooks(books);
        createBookRows(books);

        form.reset();
    });
}




document.addEventListener('DOMContentLoaded',initializeBooks);