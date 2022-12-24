function displayCredit() {
  const credit = document.getElementById("credit");
  const date = new Date();
  credit.innerText = `${date.getFullYear()}`;
}
displayCredit();
