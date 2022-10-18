// first task===============================================
const alertButton = document.querySelector(".event-block__button");
alertButton.addEventListener("click", () => alert("урря"));
// second task ==============================================
const inputFocusOut = document.querySelector(".event-block__input");
inputFocusOut.addEventListener("focusout", () => alert("ждем возвращения"));
// third task ===============================================
const inputForButton = document.querySelector(".input-text__input");
const buttonChangeText = document.querySelector(".input-text__button");
buttonChangeText.addEventListener("click", () => {
  buttonChangeText.textContent = inputForButton.value;
});
