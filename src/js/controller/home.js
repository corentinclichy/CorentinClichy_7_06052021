import Markup from "../components/Markup.js";
import RecipeHandler from "../data/recipe.js";
import Search from "../data/Search.js";

class HomeController {
  constructor(recipesContainer, badgesContainer, mainSearchInput) {
    this.markup = new Markup();
    this.recipeHandler = new RecipeHandler();
    this.recipesContainer = recipesContainer;
    this.badgesContainer = badgesContainer;
    this.mainSearchInput = mainSearchInput;
    this.badges = [];
  }

  showfilter(el) {
    //Add showFilter class allowing element to flex:1
    setTimeout(() => {
      el.focus();
      el.placeholder = `Recherche un ${el.name}`;
      if (el.parentNode.classList.contains("show")) {
        el.parentNode.parentNode.classList.add("showFilter");
      }
    }, 0);

    //Change Placeholder
  }

  resetFilter(el) {
    //select the .btn-category
    el.parentNode.parentNode.classList.remove("showFilter");

    //Change the placeholder
    let name = el.name;
    let nameWithCapitalLetter = name.charAt(0).toUpperCase() + name.slice(1);
    el.placeholder = `${nameWithCapitalLetter}s`;
  }

  _addBadge(el) {
    let badgeName = el.target.innerText;
    let typeOfBadge;
    let badges;
    //reset the container

    if (el.target.classList.contains("dropdown-item--ingredient"))
      typeOfBadge = "ingredients";

    if (el.target.classList.contains("dropdown-item--appliance"))
      typeOfBadge = "appareils";

    if (el.target.classList.contains("dropdown-item--ustensile"))
      typeOfBadge = "ustensiles";

    let index = this.badgesContainer.children.length;
    this.badgesContainer.innerHTML += this.markup.badge(
      index,
      typeOfBadge,
      badgeName
    );

    badges = this.badgesContainer.children;

    for (let badge of badges) {
      this._deleteBadge(badge, this.badgesContainer, this.badges);
    }
  }

  _deleteBadge(badge, container) {
    badge.children[1].addEventListener("click", (e) => {
      container.removeChild(e.target.parentNode);
      this.badges = this._listOfSelectedBadges(this.badgesContainer);
      // Show associated recipes
      this.showRecipes(
        this.recipesContainer,
        this.mainSearchInput.value,
        this.badges
      );
    });
  }

  showFilterItems(container, filterName, filterItemName, input) {
    const list = this.recipeHandler.listOfFilter(
      filterName,
      filterItemName,
      input
    );
    container.innerHTML = "";
    list.forEach((item) => {
      container.innerHTML += this.markup.filterItem(filterItemName, item);
    });

    for (let item of container.children) {
      item.addEventListener("click", (e) => {
        this._addBadge(e);
        this.badges = this._listOfSelectedBadges(this.badgesContainer);
        this.showRecipes(
          this.recipesContainer,
          this.mainSearchInput.value,
          this.badges
        );
      });
    }
  }

  showRecipes(container, input) {
    // If input is not empty and input.length > 3 OU if there is selected badges
    if ((input !== "" && input.length >= 3) || this.badges.length !== 0) {
      container.innerHTML = "";
      // Use the filtered method to get the associated recipes
      this.recipeHandler.filteredRecipes(input, this.badges).map((recipe) => {
        container.innerHTML += this.markup.recipeCard({
          name: recipe.name,
          description: recipe.description,
          ingredients: recipe.ingredients,
          time: recipe.time,
          ustensils: recipe.ustensils,
        });
      });
    } else {
      // If there is no filter or selected badge, show all the recipes
      container.innerHTML = "";
      this.recipeHandler.allrecipes().map((recipe) => {
        container.innerHTML += this.markup.recipeCard({
          name: recipe.name,
          description: recipe.description,
          ingredients: recipe.ingredients,
          time: recipe.time,
          ustensils: recipe.ustensils,
        });
      });
    }
  }

  /**
   * @param {HTMLElement} container
   *
   * @description
   * Just take the HTML Badges Container and return an array from the HTML Collection
   *
   * @returns {Array} Array of HTML element (badges)
   */
  // TODO: Maybe this is useless function use spread instead on the deleteBadge method????
  _listOfSelectedBadges(badgesContainer) {
    // Get the list of selected badges
    return Array.from(badgesContainer.children);
  }
}

export default HomeController;
