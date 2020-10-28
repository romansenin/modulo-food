const foodItems = document.querySelector(".food-items");
const sideCart = document.querySelector(".side-cart");
const sideCartContent = sideCart.querySelector(".cart-content");
const overlay = document.querySelector(".overlay");
let foodIndex = 4;
const rollDelay = 200; // used to wait for wheel to "roll"
let cartOpen = false;
const cart = [];
sideCart
  .querySelector(".fa-times")
  .addEventListener("click", handleShoppingCart);

document.querySelectorAll(".food-item").forEach((foodItem, index) => {
  insertFoodInfo(foodItem, index);
});

document
  .querySelectorAll(".arrow-box")
  .forEach((arrowBox) => arrowBox.addEventListener("click", handleArrowClick));

document
  .querySelector(".shopping-cart")
  .addEventListener("click", handleShoppingCart);

function addToCart(food, quantity) {
  const foodExists = cart.find((cartEntry) => cartEntry.food === food);
  if (foodExists) {
    foodExists.quantity += quantity;
  } else {
    cart.push({ food, quantity });
  }
  displayCartItems();
}

function displayCartItems() {
  sideCartContent.innerHTML = "";
  cart.forEach((cartItem) => {
    const div = document.createElement("div");
    const foodSpan = document.createElement("span");
    foodSpan.textContent = cartItem.food;
    const quantitySpan = document.createElement("span");
    quantitySpan.textContent = " " + cartItem.quantity;
    div.appendChild(foodSpan);
    div.appendChild(quantitySpan);
    sideCartContent.appendChild(div);
  });
}

function insertFoodInfo(foodItem, index) {
  const foodImg = foodItem.querySelector(".food-img");
  const foodName = foodItem.querySelector(".food-info .food-name");
  const foodPrice = foodItem.querySelector(".food-price");
  const price = foods[index].price;
  const form = foodItem.querySelector("form");

  form.setAttribute("data-id", foods[index].id);
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputTag = event.target.querySelector("input");
    const quantity = inputTag.value;
    inputTag.value = "";
    const foodName = foods[event.target.getAttribute("data-id") - 1].name;

    addToCart(foodName, parseInt(quantity));
  });

  foodPrice.querySelector(".price-dollar").textContent = price.split(".")[0];
  foodPrice.querySelector(".price-cent").textContent =
    "." + price.split(".")[1];
  foodImg.innerHTML = `<img src="./assets/images/${foods[index].filename}" alt="${foods[index].name}">`;
  foodName.textContent = foods[index].name;
}

// fades element from view and removes it from DOM, duration should match CSS transition duration for element's opacity
function rollWheel(element, newElement, left) {
  element.style.opacity = "0";
  return new Promise((resolve) => {
    setTimeout(() => {
      element.remove();
      left
        ? foodItems.appendChild(newElement)
        : foodItems.insertBefore(newElement, foodItems.firstChild);
      resolve(element);
    }, rollDelay);
  });
}

function handleArrowClick() {
  this.removeEventListener("click", handleArrowClick);
  const foodBoxes = document.querySelectorAll(".food-box");
  const clone = foodBoxes[0].cloneNode(true);
  foodIndex = foodIndex < 0 ? foods.length - 1 : foodIndex % foods.length;
  const isLeft = this.classList[1] === "arrow-left";

  isLeft
    ? insertFoodInfo(clone, foodIndex++) || rollWheel(foodBoxes[0], clone, true)
    : insertFoodInfo(clone, foodIndex--) ||
      rollWheel(foodBoxes[foodBoxes.length - 1], clone, false);

  foodBoxes.forEach((foodBox, index) => {
    const middle = foodBox.firstElementChild;
    if (isLeft) {
      if (index === 1 || index === 3) middle.classList.toggle("middle");
    } else {
      if (index === 0 || index === 2) middle.classList.toggle("middle");
    }
  });

  setTimeout(() => {
    this.addEventListener("click", handleArrowClick);
  }, rollDelay);
}

function slideCart(value, duration = 200) {
  sideCart.style.transform = `translateX(${value}%)`;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sideCart);
    }, duration);
  });
}

async function bounceCart(values) {
  let duration = 200;
  for (let i = 0; i < values.length; i++) {
    duration -= 45;
    await slideCart(values[i], duration);
  }
}

function toggleOverlay() {
  if (overlay.style.display === "" || overlay.style.display === "none") {
    overlay.style.display = "block";
    setTimeout(() => {
      overlay.style.opacity = 0.7;
    }, 0);
  } else {
    overlay.style.opacity = 0;
    setTimeout(() => {
      overlay.style.display = "none";
    }, 200);
  }
}

async function handleShoppingCart() {
  toggleOverlay();
  this.removeEventListener("click", handleShoppingCart);
  overlay.removeEventListener("click", handleOverlay);

  cartOpen ? await slideCart(100) : await slideCart(0);
  cartOpen = !cartOpen;
  if (cartOpen) {
    await bounceCart([15, 0, 5, 0]);
  }
  this.addEventListener("click", handleShoppingCart);
  overlay.addEventListener("click", handleOverlay);
}

async function handleOverlay() {
  toggleOverlay();
  await slideCart(100);
  cartOpen = false;
}
