{
  ('use strict');
  const select = {
    templateOf: {
      templateBook: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      bookElements: '.books-list .book__image',
    },
  };
  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
  };
  class BookList {
    constructor() {
      const thisBookList = this;
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initActions();
    }

    render() {
      const thisBookList = this;
      thisBookList.data = dataSource.books;
      for (let book of thisBookList.data) {
        const generatedHTML = templates.templateBook(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        thisBookList.book.appendChild(generatedDOM);
      }
    }
    getElements() {
      const thisBookList = this;
      thisBookList.book = document.querySelector(select.containerOf.bookList);
      thisBookList.bookListElem = document.querySelectorAll(select.containerOf.bookElements);

      const favoriteBooks = [];
    }
    initActions() {
      const thisBookList = this;
      for (let book of thisBookList.bookListElem) {
        book.addEventListner('dblclick', function (event) {
          event.preventDefault();
          const clickedElement = book.classList.add('favorite');
          console.log(clickedElement);
          const bookClicked = clickedElement.getAtribute('data-id');
          console.log(bookClicked);
          favoriteBooks.push(bookClicked);
        });
      }
    }
  }
  const app = {
    initProject: function () {
      new BookList();
    },
  };
  app.initProject();
}
