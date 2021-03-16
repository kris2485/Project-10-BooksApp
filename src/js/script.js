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
      thisBookList.determineRatingBgc();
      thisBookList.determineWidth();
      thisBookList.initActions();
    }

    render() {
      const thisBookList = this;
      thisBookList.data = dataSource.books;
      for (let book of thisBookList.data) {
        book.ratingBgc = thisBookList.determineRatingBgc(book.rating);
        book.ratingWidth = thisBookList.determineWidth(book.rating);
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
    determineRatingBgc(rating) {
      let background = '';
      if (rating < 0) {
        background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }
    determineWidth(rating) {
      let width = 0;
      if (rating >= 1) {
        width = 10;
      } else if (rating >= 2) {
        width = 20;
      } else if (rating >= 3) {
        width = 30;
      } else if (rating >= 4) {
        width = 40;
      } else if (rating >= 5) {
        width = 50;
      } else if (rating >= 6) {
        width = 60;
      } else if (rating >= 7) {
        width = 70;
      } else if (rating >= 8) {
        width = 80;
      } else if (rating >= 9) {
        width = 90;
      } else if (rating >= 10) {
        width = 100;
      }
      return width;
    }
  }
  const app = {
    initProject: function () {
      new BookList();
    },
  };
  app.initProject();
}
