"use strict"

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.getDOMNode = function() {
    const book = document.createElement("div");
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
    return book;
};

let library = [new Book("Bruh", "bino", 69, true), new Book("HooHah", "jeff", "420", false)];
const container = document.querySelector("div.container");
library.forEach((x)=>container.appendChild(x.getDOMNode()));

const newBookButton = document.querySelector("button.new-book");
const dialog = document.querySelector("dialog.new-book");
newBookButton.addEventListener("click", ()=>dialog.showModal());

const form = document.querySelector("form");
const submitButton = document.querySelector("form>button");
submitButton.addEventListener("click", ()=>{
    dialog.close();
    const formData = Object.fromEntries(new FormData(form));
    formData.read = "read" in formData;
    console.log(formData);
    const book = new
        Book(formData.title, formData.author, formData.pages, formData.read);
    library.push(book);
    container.appendChild(book.getDOMNode());
});
