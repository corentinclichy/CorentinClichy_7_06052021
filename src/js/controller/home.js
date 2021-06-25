import Markup from "../components/Markup.js";
import RecipeHandler from "../data/recipe.js";
import Search from "../data/Search.js";

class HomeController {
  constructor() {
    this.markup = new Markup();
    this.recipeHandler = new RecipeHandler();
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
    let container = document.querySelector(".badges");
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

    let index = container.children.length;
    container.innerHTML += this.markup.badge(index, typeOfBadge, badgeName);

    badges = document.querySelectorAll(".badge");

    badges.forEach((badge) => {
      this._deleteBadge(badge, container);
    });
  }

  _deleteBadge(badge, container) {
    let closeBtn = badge.children[1];
    closeBtn.addEventListener("click", (e) => {
      let badgeToDelete = e.target.parentNode;
      container.removeChild(badgeToDelete);
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
      });
    }
  }

  showRecipes(container, input) {
    const list = this.recipeHandler.listOfRecipes(input);
    container.innerHTML = "";

    list.map((item) => {
      const recipe = {
        name: item.name,
        description: item.description,
        ingredients: item.ingredients,
        time: item.time,
        ustensils: item.ustensils,
      };
      container.innerHTML += this.markup.recipeCard(recipe);
    });
  }
}

export default HomeController;
