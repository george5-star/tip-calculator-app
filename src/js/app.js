"use strict";

const tipItems = document.querySelectorAll(".tip-item");
const inputEls = document.querySelectorAll(".content__input");
const resetBtn = document.querySelector(".content__reset-btn");
const warningMessageEl = document.querySelector(".warning");
const numOfPeopleEl = document.querySelector(".people--input");
const tipPerPersonEl = document.querySelector(".tip-per-person");
const totalPerPersonEl = document.querySelector(".total-per-person");

let bill, tip, numOfPeople;
let result;

const tipCalculator = (bill, tip, numOfPeople) => {
  let tipInDecimal = tip / 100;
  let tipResult = Number(((bill * tipInDecimal) / numOfPeople).toFixed(2));
  let totalResult = Number((bill / numOfPeople + tipResult).toFixed(2));
  return { tipResult, totalResult };
};

tipItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    let temp = e.currentTarget.textContent;
    let currentItem = temp.slice(0, temp.length - 1);
    tip = Number(currentItem);
    e.currentTarget.classList.add("active");
  });
});

inputEls.forEach((inputEl) => {
  inputEl.addEventListener("input", function (e) {
    if (
      e.currentTarget.classList.contains("bill") &&
      Number(e.currentTarget.value) !== 0
    ) {
      warningMessageEl.classList.remove("show");
      e.currentTarget.classList.remove("warning-visuals");
      resetBtn.classList.add("active");
      bill = Number(e.currentTarget.value);
    } else if (
      e.currentTarget.classList.contains("tip") &&
      Number(e.currentTarget.value) !== 0
    ) {
      warningMessageEl.classList.remove("show");
      e.currentTarget.classList.remove("warning-visuals");
      resetBtn.classList.add("active");
      tip = Number(e.currentTarget.value);
    } else if (
      e.currentTarget.classList.contains("num-of-people") &&
      Number(e.currentTarget.value) !== 0
    ) {
      warningMessageEl.classList.remove("show");
      e.currentTarget.classList.remove("warning-visuals");
      resetBtn.classList.add("active");
      numOfPeople = Number(e.currentTarget.value);
      result = tipCalculator(bill, tip, numOfPeople);
      tipPerPersonEl.textContent = result.tipResult;
      totalPerPersonEl.textContent = result.totalResult;
    } else {
      warningMessageEl.classList.add("show");
      e.currentTarget.classList.add("warning-visuals");
      resetBtn.classList.remove("active");
    }
  });
});

resetBtn.addEventListener("click", function () {
  inputEls.forEach((item) => {
    item.value = "";
    item.classList.remove("warning-visuals");
    warningMessageEl.classList.remove("show");
  });

  tipItems.forEach((item) => {
    item.classList.remove("active");
  });

  this.classList.add("active");
  tipPerPersonEl.textContent = "$0.00";
  totalPerPersonEl.textContent = "$0.00";
});
