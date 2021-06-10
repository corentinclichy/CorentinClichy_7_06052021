class HomeController {
  constructor() {}

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

  addBadge(el, container) {
    let badgeName = el.target.innerText;
    let typeOfBadge;
    let badges;
    //reset the container

    if (el.target.classList.contains("dropdown-item--ingredients"))
      typeOfBadge = "ingredients";

    if (el.target.classList.contains("dropdown-item--appareils"))
      typeOfBadge = "appareils";

    if (el.target.classList.contains("dropdown-item--ustensiles"))
      typeOfBadge = "ustensiles";

    let index = container.children.length;
    container.innerHTML += `
        <button index=${index} class="btn badge badge--${typeOfBadge} px-3">
          <span class="pe-5">${badgeName}</span>
          <i class="far fa-times-circle"></i>
        </button>
    `;

    badges = document.querySelectorAll(".badge");

    badges.forEach((badge) => {
      let closeBtn = badge.children[1];
      closeBtn.addEventListener("click", (e) => {
        console.log(e.target);
        let badgeToDelete = e.target.parentNode;
        container.removeChild(badgeToDelete);
      });
    });
  }

  _deleteBadge(el, container) {
    console.log(container.children);
  }
}

export default HomeController;
