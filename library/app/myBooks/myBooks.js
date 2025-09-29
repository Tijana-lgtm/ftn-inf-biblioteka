function createRendedBooksRos (rentedBooks) {
    let table = document.querySelector ("#rentedBooks")

    table.innerHTML = ''

    for (let i=0; i<rentedBooks.length; i++){

            let tr = document.createElement ("tr")

            let id = document.createElement ("td")
            let title = document.createElement ("td")
            let action = document.createElement ("button")

            id.textContent = rentedBooks[i].id;
            title.textContent = rentedBooks[i].title;
            action.textContent = 'Return'

            tr.appendChild (id);
            tr.appendChild(title);
            tr.appendChild(action);


            action.addEventListener ('click', function () {
                
                clickReturnButton(id.innerHTML)
            })

            table.appendChild(tr);

    }
}

function clickReturnButton(id) {
    
    let rentedBooks = JSON.parse(localStorage.getItem('rentedBooks'));
    let availableBooks = JSON.parse(localStorage.getItem('availableBooks'));
    for (let i = 0; i < rentedBooks.length; i++) {
        if (rentedBooks[i].id == id) {
            availableBooks.push(rentedBooks[i])
            rentedBooks.splice(i,1)
        }
    }
    saveAvailableBooks(availableBooks)
    saveRentedBooks(rentedBooks)
    createRendedBooksRos(rentedBooks)
    createAvailableBooksRows(availableBooks)


}

function clickRentButton(id) {
    
    let rentedBooks = JSON.parse(localStorage.getItem('rentedBooks'));
    let availableBooks = JSON.parse(localStorage.getItem('availableBooks'));
    for (let i = 0; i < availableBooks.length; i++) {
        if (availableBooks[i].id == id) {
            rentedBooks.push(availableBooks[i])
            availableBooks.splice(i,1)
        }
    }
    saveAvailableBooks(availableBooks)
    saveRentedBooks(rentedBooks)
    createRendedBooksRos(rentedBooks)
    createAvailableBooksRows(availableBooks)


}

function createAvailableBooksRows (availableBooks) {
    let table = document.querySelector ("#availableBooks")

    table.innerHTML = ''

    for (let i=0; i< availableBooks.length; i++){

            let tr = document.createElement ("tr")

            let id = document.createElement ("td")
            let title = document.createElement ("td")
            let action = document.createElement ("button")

            id.textContent = availableBooks[i].id;
            title.textContent = availableBooks[i].title;
            action.textContent = 'Rent'

            tr.appendChild (id);
            tr.appendChild(title);
            tr.appendChild(action);


            action.addEventListener ('click', function () {
                clickRentButton(id.innerHTML)
            })

            table.appendChild(tr);

    }
}

function saveBooks(books) {
    localStorage.setItem("books", JSON.stringify(books));
}

function saveRentedBooks(books) {
    localStorage.setItem("rentedBooks", JSON.stringify(books));
}

function saveAvailableBooks(books) {
   localStorage.setItem('availableBooks', JSON.stringify(books));
}

function loadBooks() {
    let values = localStorage.getItem("books");
    if (values) {
        return JSON.parse(values);
    }
    return [];
}

function loadRentedBooks() {
    let values = localStorage.getItem("rentedBooks");
    if (values) {
        return JSON.parse(values);
    }
    return [];
}

function initializeBooks() {
    let books = loadBooks()
    let rentedBooks = loadRentedBooks();
    let availableBooks = [];
    
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

    if (rentedBooks.length === 0) {
        rentedBooks = [
            { id: "B1234", title: "Knjiga 1", date: "2022", url: "assets/images/book1.jpg", description: "Opis knjige 1", popularity: 4 }
        ];
        saveRentedBooks(rentedBooks)
    }

     for (let i = 0; i < books.length; i++) {
        let found = false;
        for (let j = 0; j < rentedBooks.length; j++) {
            if (books[i].id === rentedBooks[j].id){
                found = true;
                 break;
            }

        }
        if(!found) availableBooks.push(books[i])
    }
    saveAvailableBooks(availableBooks)     
    createRendedBooksRos(rentedBooks)
    createAvailableBooksRows(availableBooks)
}
document.addEventListener('DOMContentLoaded',initializeBooks);