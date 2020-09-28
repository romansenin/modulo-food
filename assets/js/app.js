const foodItems = document.querySelector(".food-items");
let index = 4;

document.querySelectorAll(".food-item").forEach((foodItem, index) => {
  displayFood(foodItem, index);
});

function displayFood(foodItem, index) {
  const foodImg = foodItem.querySelector(".food-img");
  const foodName = foodItem.querySelector(".food-info .food-name");
  const foodPrice = foodItem.querySelector(".food-price");
  const price = foods[index].price;

  foodPrice.querySelector(".price-dollar").textContent = price.split(".")[0];
  foodPrice.querySelector(".price-cent").textContent = price.split(".")[1];
  foodImg.innerHTML = `<img src="./assets/images/${foods[index].filename}" alt="${foods[index].name}">`;
  foodName.textContent = foods[index].name;
}

// fades element from view and removes it from DOM, duration should match CSS transition duration for element's opacity
async function rollWheel(element, duration, newElement, left) {
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

document.querySelector(".arrow-left").addEventListener("click", async () => {
  const foodBoxes = document.querySelectorAll(".food-box");
  const clone = foodBoxes[0].cloneNode(true);
  index = index < 0 ? foods.length - 1 : index;
  displayFood(clone, index++ % foods.length); // hence the name of the app
  rollWheel(foodBoxes[0], 40, clone, 1);

  for (let i = 1; i < foodBoxes.length; i++) {
    const middle = foodBoxes[i].firstElementChild;
    if (i == 1) middle.classList.remove("middle");
    else if (i == 3) middle.classList.add("middle");
  }
});

document.querySelector(".arrow-right").addEventListener("click", async () => {
  const foodBoxes = document.querySelectorAll(".food-box");
  const clone = foodBoxes[0].cloneNode(true);
  index = index < 0 ? foods.length - 1 : index;
  displayFood(clone, index-- % foods.length);
  await rollWheel(foodBoxes[foodBoxes.length - 1], 40, clone, 0);

  for (let i = 0; i < foodBoxes.length; i++) {
    const middle = foodBoxes[i].firstElementChild;
    if (i == 0) middle.classList.add("middle");
    else if (i == 2) middle.classList.remove("middle");
  }
});
