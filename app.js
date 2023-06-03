//Getting id from DOM start
var budget = document.getElementById("budget");

var totalAmount = document.getElementById("totalAmount");
var category = document.getElementById("category");
var date = document.getElementById("date");
var description = document.getElementById("description");

var totalBudget = document.getElementById("totalBudget");
var expences = document.getElementById("expences");
var balance = document.getElementById("balance");

var currentDate = document.getElementById("currentDate");
var totalItems = document.getElementById("totalItems");
var totalValue = document.getElementById("totalValue");
//Getting id from DOM end

//Set Budget function start
function setBudget() {
  const numbers = /^[0-9]+$/;
  if (budget.value.match(numbers)) {
    localStorage.setItem("Budget", JSON.stringify(budget.value));
    location.href = location.href;
    return true;
  } else {
    var p1 = document.getElementById("p1");
    p1.innerHTML = "Please enter numbers only.";
    return false;
  }
}
//Set Budget function end

var sum = 0;

//Total expences function start
function totalExpences() {
  var oldData = JSON.parse(localStorage.getItem("Expences")) ?? [];
  const getBudget = JSON.parse(localStorage.getItem("Budget"));
  var amount = sum + Number(totalAmount.value);
  const numbers = /^[0-9]+$/;
  if (amount > getBudget) {
    alert(
      `Your enter amount is exceeded your budget amount.. \nAvailable balance is: ${
        getBudget - sum
      }`
    );
    location.href = location.href;
  } else {
    var obj = {
      id: oldData.length > 0 ? oldData[oldData.length - 1].id + 1 : 1,
      amount: totalAmount.value,
      category: category.value,
      date: date.value,
      description: description.value,
    };
    if (totalAmount.value.match(numbers)) {
      localStorage.setItem("Expences", JSON.stringify([...oldData, obj]));
      location.href = location.href;
      return true;
    } else {
      var p2 = document.getElementById("p2");
      p2.innerHTML = "Please enter numbers only.";
      return false;
    }
  }
}
//Total expences function end

var arr = [];

//Alldata function start
function alldata() {
  const getBudget = JSON.parse(localStorage.getItem("Budget"));
  const getExpence = JSON.parse(localStorage.getItem("Expences")) || [];
  if (getBudget == null) {
    totalBudget.innerHTML = "0";
  } else {
    totalBudget.innerHTML = "$" + getBudget;
  }
  getExpence.length &&
    getExpence.map((ele) => {
      return (sum += Number(ele.amount));
    });
  getExpence.length &&
    getExpence.forEach((ele) => {
      expences.innerHTML = "$" + sum;
      const totalBalance = getBudget - sum;
      balance.innerHTML = "$" + totalBalance;
      arr.push(ele.id);
    });
  if (getExpence.length > 0) {
    var myDiv = document.querySelector(".myDiv");
    const mapData = getExpence
      .map((element) => {
        return `<div class='box8' id='${element.id}'>
          <h2>Amount: <span>-$${element.amount}</span></h2>
          <h2>Category: <span>${element.category}</span></h2>
          <h2>Date: <span>${element.date}</span></h2>
          <h2>Description: <span>${element.description}</span></h2>
          <button id="btn" onClick="edit(this)">Edit</button>
          <button id="btn" onClick="deleteData(this)">Delete</button>
      </div>`;
      })
      .join("");
    myDiv.innerHTML = mapData;
    totalItems.innerHTML = "Number of transaction: " + arr.length;
  }
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  const setDate =
    weekday[date.getDay()] +
    "/" +
    date.getFullYear() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getDate();
  currentDate.innerHTML = "Current Date: " + setDate;
  totalValue.innerHTML = "Value: $" + sum;
}
//Alldata function end

//ClearStorageData function start
function clearStorageData() {
  localStorage.clear();
  location.href = location.href;
}
//ClearStorageData function end

//Modal start
var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

var id = 0;

function edit(thisVal) {
  modal.style.display = "block";
  id = thisVal.parentNode.id;
}
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//Modal end

//Edit function start
function editList() {
  const getBudget = JSON.parse(localStorage.getItem("Budget"));
  var oldData = JSON.parse(localStorage.getItem("Expences")) ?? [];
  var index = oldData.findIndex((o) => o.id == id);

  var editAmount = document.getElementById("editAmount");
  var editCategory = document.getElementById("editCategory");
  var editDate = document.getElementById("editDate");
  var editDescription = document.getElementById("editDescription");
  const numbers = /^[0-9]+$/;

  oldData[index].amount = editAmount.value;
  oldData[index].category = editCategory.value;
  oldData[index].date = editDate.value;
  oldData[index].description = editDescription.value;
  var budgetAmount = getBudget - oldData[index].amount;
  expences.innerHTML = "$" + budgetAmount;
  if (editAmount.value.match(numbers)) {
    localStorage.setItem("Expences", JSON.stringify(oldData));
    location.href = location.href;
  } else {
    var p3 = document.getElementById("p3");
    p3.innerHTML = "Please enter numbers only.";
    modal.style.display = "block";
  }
}
//Edit function end

//Delete function start
function deleteData(thisVal) {
  var oldData = JSON.parse(localStorage.getItem("Expences")) ?? [];
  var index = oldData.findIndex((o) => o.id == thisVal.parentNode.id);
  oldData.splice(index, 1);
  localStorage.setItem("Expences", JSON.stringify(oldData));
  arr.length - 1;
  location.href = location.href;
}
//Delete function end
