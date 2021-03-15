{
  ('use strict');
  const select = {
    templateOf: {
      templateBook: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      bookElements: '.books-list .book',
    },
    checkbox: {
      filter: '.filters',
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
      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
    }
    initActions() {
      const thisBookList = this;

      thisBookList.checkboxElem = document.querySelectorAll(select.checkbox.filter);
      for (let checkButton of thisBookList.checkboxElem) {
        checkButton.addEventListener('click', function (event) {
          const clickedElement = event.target;
          if (clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox' && clickedElement.name == 'filter') {
            console.log(clickedElement.value);
          }
          if (clickedElement.checked) {
            thisBookList.filters.push(clickedElement.value);
          } else {
            thisBookList.filters.splice(thisBookList.filters.indexOf('clickedElement.value'));
          }
          console.log('filters', thisBookList.filters);
          thisBookList.filtersBooks();
        });
      }

      thisBookList.bookListElem = document.querySelectorAll(select.containerOf.bookElements);
      console.log(thisBookList.bookListElem);
      for (let book of thisBookList.bookListElem) {
        book.addEventListener('dblclick', function (event) {
          event.preventDefault();
          const clickedElement = event.target.offsetParent;

          if (clickedElement.classList.contains('book__image')) {
            if (!clickedElement.classList.contains('favorite')) {
              clickedElement.classList.add('favorite');
              const bookClicked = clickedElement.getAttribute('data-id');
              thisBookList.favoriteBooks.push(bookClicked);
            } else {
              clickedElement.classList.remove('favorite');
              thisBookList.favoriteBooks.splice(thisBookList.favoriteBooks.indexOf('bookClicked'));
            }
          }
        });
      }
    }
    filtersBooks() {
      const thisBookList = this;
      for (let elem of dataSource.books) {
        let shouldBeHidden = false;
        for (const filter of thisBookList.filters) {
          if (!elem.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden) {
          const hide = document.querySelector('.book__image[data-id="' + elem.id + '"]');
          hide.classList.add('hidden');
        } else {
          const uncover = document.querySelector('.book__image[data-id="' + elem.id + '"]');
          uncover.classList.remove('hidden');
        }
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
