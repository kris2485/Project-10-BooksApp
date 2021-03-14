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
      console.log(thisBookList.book);
    }
    initActions() {
      const thisBookList = this;
      const favoriteBooks = [];
      thisBookList.bookListElem = document.querySelectorAll(select.containerOf.bookElements);
      console.log(thisBookList.bookListElem);
      for (let book of thisBookList.bookListElem) {
        book.addEventListener('dblclick', function (event) {
          event.preventDefault();
          const clickedElement = this;

          if (!clickedElement.classList.contains('favorite') == true) {
            clickedElement.classList.add('favorite');
            const bookClicked = clickedElement.getAttribute('data-id');
            favoriteBooks.push(bookClicked);
          } else {
            clickedElement.classList.remove('favorite');
            favoriteBooks.splice(favoriteBooks.indexOf('bookClicked'));
          }
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
