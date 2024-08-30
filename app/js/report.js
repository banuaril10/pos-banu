require("jquery");
require("popper.js");
require("bootstrap");
var $ = require("jquery");

// get cashier information
$("#loaderpos").html(
  "<img id='loading-image' src='./img/loading2.gif' alt='Loading...' />"
);

$("#loaderpos").hide();



var isDialogSupported = true;
if (!window.HTMLDialogElement) {
  document.body.classList.add("no-dialog");
  isDialogSupported = false;
}

// log out
const btnback = document.getElementById("btnback");
btnback.addEventListener("click", function (event) {
  window.location.href = `file:///${__dirname}/home.html`;
});

const btnlaporansales = document.getElementById("btnlaporansales");
const btnlaporanstock = document.getElementById("btnlaporanstock");


btnlaporansales.addEventListener("click", function (event) {
  window.location.href = `file:///${__dirname}/report_sales.html`;
});

btnlaporanstock.addEventListener("click", function (event) {
  window.location.href = `file:///${__dirname}/report_stock.html`;
} );




