document.querySelectorAll(".food-item").forEach((foodItem, index) => {
  const foodImg = foodItem.querySelector(".food-img");
  const foodName = foodItem.querySelector(".food-info .food-name");
  const foodPrice = foodItem.querySelector(".food-price");
  const price = foods[index].price;

  foodPrice.querySelector(".price-dollar").textContent = price.split(".")[0];
  foodPrice.querySelector(".price-cent").textContent = price.split(".")[1];
  foodImg.innerHTML = `<img src="./assets/images/${foods[index].filename}" alt="${foods[index].name}">`;
  foodName.textContent = foods[index].name;
});

// fades element from view and removes it from DOM, duration should match CSS transition duration for element's opacity
async function fadeElement(element, duration) {
  element.style.opacity = "0";
  return new Promise((resolve) => {
    setTimeout(() => {
      element.style.display = "none";
      // element.style.position = "absolute";
      element.remove();
      resolve(element);
    }, duration);
  });
}

document.querySelector(".arrow-left").addEventListener("click", async () => {
  const firstFoodItem = document.querySelector(".food-item-box");
  console.log(firstFoodItem);
  const clone = firstFoodItem.cloneNode(true);
  fadeElement(firstFoodItem, 200);
  // document.querySelector(".food-items").appendChild(clone);
  // firstFoodItem.style.display = "block";
  // firstFoodItem.style.opacity = "1";
});
