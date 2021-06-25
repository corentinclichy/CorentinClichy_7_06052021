import Markup from "../components/Markup.js";
import RecipeHandler from "../data/recipe.js";
import Search from "../data/Search.js";

class HomeController {
  constructor() {
    this.markup = new Markup();
    this.recipeHandler = new RecipeHandler();
  }

  showfilter(el) {
    el.focus();
    //Open dropdown
    el.parentNode.classList.add("show");
    el.parentNode.parentNode.children[1].classList.add("show");
    //Add showFilter class allowing element to flex:1
    el.parentNode.parentNode.classList.add("showFilter");
    //Change Placeholder
    el.placeholder = `Recherche un ${el.name}`;
  }

  resetFilter(el) {
    //select the .btn-category
    let btn = el.parentNode.parentNode;
    //remove the showfilter
    btn.classList.remove("showFilter");

    // Close dropdown
    btn.children[1].classList.remove("show");
    btn.children[0].classList.remove("show");

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
    console.log(container);
    console.log(el.target);

    if (el.target.classList.contains("dropdown-item--ingredient"))
      typeOfBadge = "ingredients";

    if (el.target.classList.contains("dropdown-item--appliance"))
      typeOfBadge = "appareils";

    if (el.target.classList.contains("dropdown-item--ustensile"))
      typeOfBadge = "ustensiles";

    let index = container.children.length;
    console.log(typeOfBadge);
    container.innerHTML += this.markup.badge(index, typeOfBadge, badgeName);

    badges = document.querySelectorAll(".badge");

    badges.forEach((badge) => {
      this._deleteBadge(badge, container);
    });
  }

  _deleteBadge(badge, container) {
    console.log(container);
    let closeBtn = badge.children[1];
    closeBtn.addEventListener("click", (e) => {
      console.log(e.target);
      let badgeToDelete = e.target.parentNode;
      container.removeChild(badgeToDelete);
    });
  }

  showFilterItems(container, filterName, filterItemName) {
    const list = this.recipeHandler.listOfFilter(filterName, filterItemName);
    container.innerHTML = "";
    list.forEach((item) => {
      container.innerHTML += this.markup.filterItem(filterItemName, item);
    });

    console.log(container.children);
    for (let item of container.children) {
      item.addEventListener("click", (e) => {
        console.log("helleo");
        this._addBadge(e);
      });
    }
  }

  showRecipes(container, input) {
    const list = this.recipeHandler.listOfRecipes(input);
    container.innerHTML = "";

    console.log(list);

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

  ///Search

  _getInput(input) {
    console.log(input);
    const search = new Search(input);

    search.listOfKeywords();
  }
}

export default HomeController;
