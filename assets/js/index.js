const foods = [
  { name: "Bread", filename: "bread.jpg" },
  { name: "Eggs", filename: "eggs.png" },
  { name: "Milk", filename: "milk.png" },
  { name: "Steak", filename: "steak-pork.png" },
  { name: "Pizza", filename: "pizza.png" },
];

document.querySelectorAll(".food-img").forEach((foodItem, index) => {
  foodItem.innerHTML = `<img src="./assets/images/${foods[index].filename}" alt="">`;
});
