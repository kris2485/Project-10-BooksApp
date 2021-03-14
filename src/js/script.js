{
  ('use strict');
  const select = {
    templateOf: {
      templateBook: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
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
    }
  }
  const app = {
    initProject: function () {
      new BookList();
    },
  };
  app.initProject();
}
