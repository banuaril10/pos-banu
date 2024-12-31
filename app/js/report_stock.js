require("jquery");
require("popper.js");
require("bootstrap");
var $ = require("jquery");

// get cashier information
$("#loaderpos").html(
  "<img id='loading-image' src='./img/loading2.gif' alt='Loading...' />"
);
getinfo();
$("#loaderpos").hide();

function getinfo() {
  var objinfo = JSON.parse(localStorage.getItem("info"));
  divshopname.innerHTML = objinfo.shopname;
}

var isDialogSupported = true;
if (!window.HTMLDialogElement) {
  document.body.classList.add("no-dialog");
  isDialogSupported = false;
}

// log out
const btnback = document.getElementById("btnback");
btnback.addEventListener("click", function (event) {
  window.location.href = `file:///${__dirname}/report.html`;
});

const btnstockcategory = document.getElementById("btnstockcategory");

function hide_all() {
  //reset datatable
  $("#tablestock").DataTable().destroy();

  $("#tablestock").hide();

}

btnstockcategory.addEventListener("click", async function (event) {
  hide_all();
  get_report_stock();
});


btnexportexcel.addEventListener("click", async function (event) {
  var jenis_laporan = $("#jenis_laporan").val();
  var title_report = $("#title_report").html();
  var table = "";
  var data = "";
  var dataexcel = [];

  if (jenis_laporan == "get_report_stock") {
    data = get_excel_stock();
    var row_title = [];
    row_title.push("No");
    row_title.push("Category");
    row_title.push("Qty");
    row_title.push("Total (Rp)");

    dataexcel.push(row_title);

    for (var i = 0; i < data.length; i++) {
      var row = [];
      row.push(data[i].no);
      row.push(data[i].category);
      row.push(data[i].qty);
      row.push(data[i].total_norp);
      dataexcel.push(row);
    }
  } 

  var csv = "";
  dataexcel.forEach(function (row) {
    csv += row.join(",");
    csv += "\n";
  });

  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
  hiddenElement.target = "_blank";
  hiddenElement.download = title_report + ".csv";
  hiddenElement.click();
});



function get_report_stock() {
  $.ajax({
    url:
      "http://" +
      api_storeapps +
      "/pi/api/cyber/report_stock.php",
    type: "GET",
    beforeSend: function () {
      $("#statussync").html("proses sync stock");
    },
    async: false,
    success: function (dataResult) {
      console.log(dataResult);
      var dataResult = JSON.parse(dataResult);

      $("#jenis_laporan").val("get_report_stock");
      $("#title_report").html("Report Stock");
      $("#tablestock").show();
      $("#tablestock").DataTable({
        data: dataResult,
        columns: [
          { data: "no" },
          { data: "category" },
          { data: "qty" },
          { data: "total" },
        ],
      });
    },
  });
}




function get_excel_stock() {
  var dataResults = "";
  $.ajax({
    url: "http://" + api_storeapps + "/pi/api/cyber/report_stock.php",
    type: "GET",
    beforeSend: function () {
      $("#statussync").html("proses sync stock");
    },
    async: false,
    success: function (dataResult) {
      // console.log(dataResult);
      dataResults = JSON.parse(dataResult);
    },
  });
  return dataResults;
}