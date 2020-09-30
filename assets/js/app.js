const foodItems = document.querySelector(".food-items");
let index = 4;

document.querySelectorAll(".food-item").forEach((foodItem, index) => {
  insertFoodInfo(foodItem, index);
});

function insertFoodInfo(foodItem, index) {
  const foodImg = foodItem.querySelector(".food-img");
  const foodName = foodItem.querySelector(".food-info .food-name");
  const foodPrice = foodItem.querySelector(".food-price");
  const price = foods[index].price;

  foodPrice.querySelector(".price-dollar").textContent = price.split(".")[0];
  foodPrice.querySelector(".price-cent").textContent =
    "." + price.split(".")[1];
  foodImg.innerHTML = `<img src="./assets/images/${foods[index].filename}" alt="${foods[index].name}">`;
  foodName.textContent = foods[index].name;
}

// fades element from view and removes it from DOM, duration should match CSS transition duration for element's opacity
function rollWheel(element, newElement, duration, left) {
  element.style.opacity = "0";
  return new Promise((resolve) => {
    setTimeout(() => {
      element.remove();
      left
        ? foodItems.appendChild(newElement)
        : foodItems.insertBefore(newElement, foodItems.firstChild);
      resolve(element);
    }, duration);
  });
}

document.querySelector(".arrow-left").addEventListener("click", () => {
  const foodBoxes = document.querySelectorAll(".food-box");
  const clone = foodBoxes[0].cloneNode(true);
  index = index < 0 ? foods.length - 1 : index;
  insertFoodInfo(clone, index++ % foods.length); // hence the name of the site
  rollWheel(foodBoxes[0], 20, clone, 1);

  for (let i = 1; i < foodBoxes.length; i++) {
    const middle = foodBoxes[i].firstElementChild;
    if (i == 1) middle.classList.remove("middle");
    else if (i == 3) middle.classList.add("middle");
  }
});

document.querySelector(".arrow-right").addEventListener("click", () => {
  const foodBoxes = document.querySelectorAll(".food-box");
  const clone = foodBoxes[0].cloneNode(true);
  index = index < 0 ? foods.length - 1 : index;
  insertFoodInfo(clone, index-- % foods.length);
  rollWheel(foodBoxes[foodBoxes.length - 1], 40, clone, 0);

  for (let i = 0; i < foodBoxes.length; i++) {
    const middle = foodBoxes[i].firstElementChild;
    if (i == 0) middle.classList.add("middle");
    else if (i == 2) middle.classList.remove("middle");
  }
});
