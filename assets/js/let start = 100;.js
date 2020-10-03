let start = 100;
const result = [];
for (let i = 1; i <= 5; i++) {
  start = 100 * (1 / 5);
  result.push(start);
  console.log(start);
}

console.log(result.reduce((a, b) => a + b, 0));
