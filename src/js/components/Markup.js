class Markup {
  constructor() {}

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
          <p class="card-recipeSteps p-0 m-0 flex-grow-1 w-50">
            ${description}
          </p>
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
    <div class="no-recipes-container d-flex flex-column align-items-center justify-content-center mt-5">
      <p>Il n'y a pas de résutlat</p>
      <p>Vous pouvez par exemple rechercher:</p>
      <ul class='list-unstyled text-center'>
        <li class="search_suggestion">Salade</li>
        <li class="search_suggestion">Gratin</li>
        <li class="search_suggestion">Smoothie</li>
      </ul>
    </div>

    `;
  }
}

export default Markup;
