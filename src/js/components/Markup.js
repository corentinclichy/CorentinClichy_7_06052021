/**
 * @module Markup
 * @description
 * Class for all the markup components
 **/
class Markup {
  filterItem(filterItemName, name) {
    return `
    <li class="dropdown-item__wrapper">
      <a class="dropdown-item dropdown-item--${filterItemName}" href="#">${name}</a>
    </li>
    `;
  }

  recipeCard({ name, description, ingredients, time, ustensils }) {
    return `
    <div class="card">
      <div class="card__image"></div>
      <div class="card-body">
        <div class="card-headings d-flex justify-content-between mb-3">
          <h5 class="card-title p-0 m-0 fw-light">${name}</h5>
          <div class="card-time d-flex align-items-center fw-bold">
            <i class="far fa-clock pe-1"></i>
            <p class="p-0 m-0">${time} min</p>
          </div>
        </div>
        <div class="card-text d-flex gap-3">
          <ul class="card-ingredients p-0 m-0">
          ${ingredients
            .map(
              (ingredient) =>
                `<li><strong>${ingredient.ingredient}${
                  "quantity" in ingredient ? ":" : ""
                }</strong> ${
                  "quantity" in ingredient ? ingredient.quantity : ""
                } ${"unit" in ingredient ? ingredient.unit : ""}</li>`
            )
            .join("")}
          </ul>
          <div class='module line-clamp'>
            <p class="card-recipeSteps p-0 m-0 flex-grow-1">
            ${description}
            </p>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  badge(index, typeOfBadge, badgeName) {
    return `
    <button index=${index} class="btn badge badge--${typeOfBadge} px-3">
          <span class="pe-5">${badgeName}</span>
          <i class="far fa-times-circle"></i>
    </button>
    `;
  }

  noResults() {
    return `
    <div className="error-screen d-flex flex-column justify-content-center">
    <p>Il n'y a pas de résutlat</p>
    <p>You could have tried:</p>
    <ul class='list-unstyled'>
    <li class="text-success">Salade</li>
    <li class="text-success">Gratin</li>
    <li class="text-success">Smoothie</li>
    </ul>
    </div>

    `;
  }
}

export default Markup;
