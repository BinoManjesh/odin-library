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

    [`Title: ${this.title}`, `Author: ${this.author}`, `Pages: ${this.pages}`,
        `Read: ${this.read ? "Yes" : "No"}`]
        .forEach((x)=>list.appendChild(getListItem(x)));
    return book;
};

let library = [new Book("Bruh", "bino", 69, true), new Book("HooHah", "jeff", "420", false)];
const container = document.querySelector("div.container");
library.forEach((x)=>container.appendChild(x.getDOMNode()));
