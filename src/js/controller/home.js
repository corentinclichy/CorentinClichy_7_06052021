import Markup from '../components/Markup.js';
import RecipeHandler from '../data/recipe.js';

/**
 * @method HomeController
 * @description Controller for the home page
 * @param {HTMLElement} recipesContainer
 * @param {HTMLElement} badgesContainer
 *  @property {HTMLElement} mainSearchInput
 */
class HomeController {
  constructor(recipesContainer, badgesContainer, mainSearchInput) {
    this.markup = new Markup();
    this.recipeHandler = new RecipeHandler();
    this.recipesContainer = recipesContainer;
    this.badgesContainer = badgesContainer;
    this.mainSearchInput = mainSearchInput;
    this.badges = [];
    this.input = document.querySelector('.search__input');
  }

  /**
   * @param {HTMLElement} Element
   * @description
   * Display the filter and adapt styling
   **/
  showfilter(el) {
    //Add showFilter class allowing element to flex:1 and change the placeholder as well as display filters
    setTimeout(() => {
      el.focus();
      el.placeholder = `Recherche un ${el.name}`;
      if (el.parentNode.classList.contains('show')) {
        el.parentNode.parentNode.classList.add('showFilter');
      }
    }, 0);
  }

  /**
   * @param {HTMLElement} Element
   * @description
   * Reset filter to default value
   **/
  resetFilter(el) {
    // Remove the showFilter class to hide the filters
    el.parentNode.parentNode.classList.remove('showFilter');
    //Change the placeholder to the default value with capital letter for the first char and a s at the end
    el.value = '';
    el.placeholder = `${el.name.charAt(0).toUpperCase() + el.name.slice(1)}s`;
  }

  /**
   * @param {HTMLElement} Element
   * @description Add badge to the badge container
   **/
  _addBadge(el) {
    // Check if the badge contains a specific css class
    let typeOfBadge;
    switch (true) {
      case el.target.classList.contains('dropdown-item--ingredient'):
        typeOfBadge = 'ingredients';
        break;
      case el.target.classList.contains('dropdown-item--appliance'):
        typeOfBadge = 'appareils';
        break;
      case el.target.classList.contains('dropdown-item--ustensile'):
        typeOfBadge = 'ustensiles';
        break;
    }

    // Add the badge to the badge container using the specific markup
    this.badgesContainer.innerHTML += this.markup.badge(
      this.badgesContainer.children.length,
      typeOfBadge,
      el.target.innerText
    );

    for (let badge of this.badgesContainer.children) {
      this._deleteBadge(badge, this.badgesContainer);
    }
  }

  /**
   * @param {HTMLElement} Specific badge that will be deleted
   * @param {HTMLElement} Container of badges
   * @description Delete a specific badge from the badge container and update the recipes
   * @return null
   **/
  _deleteBadge(badge, container) {
    //Add an even listener to the badge cross icon to delete it
    badge.children[1].addEventListener('click', (e) => {
      container.removeChild(e.target.parentNode);
      this.badges = [...this.badgesContainer.children];
      // Show associated recipes
      this.showRecipes(
        this.recipesContainer,
        this.mainSearchInput.value,
        this.badges
      );
    });
  }

  /**
   * @param {HTMLElement} Container of badges
   * @param {string} Name of the filter categorie (ex: ingrédients)
   * @param {string} Name of the filter (ex: carotte)
   * @param {input} input if user search on the input
   * @description Show filter item on each badge container and update if user type a search on the input
   * @return null
   **/
  showFilterItems(container, filterName, filterItemName, input) {
    container.innerHTML = '';

    // Display the filter item on each filter container
    this.recipeHandler
      .listOfFilter(filterName, filterItemName, input)
      .forEach((item) => {
        container.innerHTML += this.markup.filterItem(filterItemName, item);
      });

    // add a listener to the filter item to add it to the badge container
    for (let item of container.children) {
      item.addEventListener('click', (e) => {
        this._addBadge(e);
        this.badges = [...this.badgesContainer.children];
        //update the recipes associeted to the filter
        this.showRecipes(
          this.recipesContainer,
          this.mainSearchInput.value,
          this.badges
        );
      });
    }
  }

  /**
   * @param {HTMLElement} Container to display error message
   * @description show error messsage if the user type a wrong search (no recipes found)
   * @return null
   **/
  showErrorMessage(container, input) {
    // Display error message if no recipes found
    container.innerHTML = this.markup.noResults();

    // Select all li element of container
    let listOfSuggestions = container.querySelectorAll('li');
    listOfSuggestions.forEach((item) => {
      // Add a listener to the li element
      item.addEventListener('click', (e) => {
        // Delete the badges inside the badge container
        this.badgesContainer.innerHTML = '';
        // Reset the array of badges
        this.badges = [...this.badgesContainer.children];
        // Change the value of the input to the value of the li element
        this.input.value = e.target.innerText;
        input = this.input.value;
        // Reset the container
        container.innerHTML = '';
        // Show the recipes associated to the new value
        this.showRecipes(container, input);
      });
    });
  }

  /**
   * @param {HTMLElement} Container of recipes
   * @param {input} input if the use search on the main input
   * @description Display recipes
   * @return null
   **/
  showRecipes(container, input) {
    // If input is not empty and input.length > 3 OU if there is selected badges
    if ((input !== '' && input.length >= 3) || this.badges.length !== 0) {
      container.innerHTML = '';
      // Use the filtered method to get the associated recipes
      // if there is no recipes, display an error message
      this.recipeHandler.filteredRecipes(input, this.badges).length !== 0
        ? this.recipeHandler
            .filteredRecipes(input, this.badges)
            .map(({ name, description, ingredients, time, ustensils }) => {
              container.innerHTML += this.markup.recipeCard({
                name: name,
                description: description,
                ingredients: ingredients,
                time: time,
                ustensils: ustensils
              });
            })
        : this.showErrorMessage(container, input);
    } else {
      // If there is no filter or selected badge, show all the recipes
      container.innerHTML = '';
      this.recipeHandler
        .allrecipes()
        .map(({ name, description, ingredients, time, ustensils }) => {
          container.innerHTML += this.markup.recipeCard({
            name: name,
            description: description,
            ingredients: ingredients,
            time: time,
            ustensils: ustensils
          });
        });
    }
  }
}

export default HomeController;
