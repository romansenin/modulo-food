const foods = [
  { name: "Bread", filename: "bread.jpg" },
  { name: "Eggs", filename: "eggs.png" },
  { name: "Milk", filename: "milk.png" },
  { name: "Steak", filename: "steak-pork.png" },
  { name: "Pizza", filename: "pizza.png" },
];

document.querySelectorAll(".food-item").forEach((foodItem, index) => {
  const foodImg = foodItem.querySelector(".food-img");
  const foodName = foodItem.querySelector(".food-info .food-name");
  foodImg.innerHTML = `<img src="./assets/images/${foods[index].filename}" alt="">`;
  foodName.textContent = foods[index].name;
});
