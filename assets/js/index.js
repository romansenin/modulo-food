const foods = [
  { name: "Bread", filename: "bread.jpg", price: "10.99" },
  { name: "Eggs", filename: "eggs.png", price: "11.99" },
  { name: "Milk", filename: "milk.png", price: "12.99" },
  { name: "Steak", filename: "steak-pork.png", price: "13.99" },
  { name: "Pizza", filename: "pizza.png", price: "14.99" }
];

document.querySelectorAll(".food-item").forEach((foodItem, index) => {
  const foodImg = foodItem.querySelector(".food-img");
  const foodName = foodItem.querySelector(".food-info .food-name");
  const foodPrice = foodItem.querySelector(".food-price");
  console.log(foodPrice);
  foodPrice.querySelector(".price-dollar").textContent = foods[index].price.split(".")[0];
  foodPrice.querySelector(".price-cent").textContent = foods[index].price.split(".")[1];
  foodImg.innerHTML = `<img src="./assets/images/${foods[index].filename}" alt="${foods[index].name}">`;
  foodName.textContent = foods[index].name;
});
