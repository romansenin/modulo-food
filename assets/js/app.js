document.querySelectorAll(".food-item").forEach((foodItem, index) => {
  const foodImg = foodItem.querySelector(".food-img");
  const foodName = foodItem.querySelector(".food-info .food-name");
  const foodPrice = foodItem.querySelector(".food-price");
  foodPrice.querySelector(".price-dollar").textContent = foods[index].price.split(".")[0];
  foodPrice.querySelector(".price-cent").textContent = foods[index].price.split(".")[1];
  foodImg.innerHTML = `<img src="./assets/images/${foods[index].filename}" alt="${foods[index].name}">`;
  foodName.textContent = foods[index].name;
});
