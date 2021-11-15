import View from "./View.js";
import icons from "url:../../img/icons.svg"; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultPerPage);

    const prevButton = `
      <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      `;

    const nextButton = `
      <button data-goto="${curPage + 1}"class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;

    // Page 1, there are other pages
    if (curPage === 1 && numPages > 1) return nextButton;

    // Last Page
    if (curPage === numPages && numPages > 1) return prevButton;

    // Other Pages
    if (curPage < numPages) return prevButton + nextButton;

    // Page 1, there are NO other pages
    return ``;
  }
}
export default new PaginationView();
