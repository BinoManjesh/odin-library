"use strict"

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.getDOMNode = function(index) {
    const book = document.createElement("div");
    book.dataset.index = index;
    book.className = "book";
    const list = document.createElement("ul");
    book.appendChild(list);

    function getListItem(text) {
        const listItem = document.createElement("li");
        listItem.innerText = text;
        return listItem;
    }

    [`"${this.title}"`, `by ${this.author}`, `${this.pages} Pages`,
        `${this.read ? "Read" : "Not Read"}`]
        .forEach((x)=>list.appendChild(getListItem(x)));
    
    const button = document.createElement("button")
    button.textContent = "Remove"
    book.appendChild(button);
    function onRemove() {
        library.splice(this.dataset.index, 1);
        this.remove();
        for (const [index, node] of Array.from(container.children).entries()) {
            node.dataset.index = index;
        }
    }
    book.addEventListener("click", onRemove);
    return book;
};

let library = [new Book("Bruh", "bino", 69, true), new Book("HooHah", "jeff", "420", false)];
const container = document.querySelector("div.container");
for (const [index, book] of library.entries()) {
    container.appendChild(book.getDOMNode(index));
}

const newBookButton = document.querySelector("button.new-book");
const dialog = document.querySelector("dialog.new-book");
newBookButton.addEventListener("click", ()=>dialog.showModal());

const form = document.querySelector("form");
form.addEventListener("submit", (e)=>{
    console.log(e.target);
    const formData = Object.fromEntries(new FormData(e.target));
    e.target.reset();
    formData.read = "read" in formData;
    console.log(formData);
    const book = new
        Book(formData.title, formData.author, formData.pages, formData.read);
    library.push(book);
    container.appendChild(book.getDOMNode(library.length - 1));
});
