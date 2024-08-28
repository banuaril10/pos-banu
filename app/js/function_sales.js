$("#date").val(toDateInputValue(new Date()));

// var ip_local = "http://10.0.106.2";
var ip_local = "http://localhost";

function checkOnlineStatus() {
  $.get(
    "https://intransit.idolmartidolaku.com/apiidolmart/sales_order",
    function (data, status) {
      $("#online-status").html("<span class='dot-green'></span> ");
      $("#online-status").css("color", "green");
      //add dot green
      $("#online-status").append("ONLINE");
    }
  ).fail(function () {
    $("#online-status").html("<span class='dot-red'></span> ");
    $("#online-status").css("color", "red");
    //add dot red
    $("#online-status").append("OFFLINE");
  });
}
setInterval(checkOnlineStatus, 2000);

//function with loading spinner

function syncSalesHeader() {
  var date = $("#date").val();
  var url = ip_local + "/pi_cyber/api/cyber/sync_sales_header.php?date=" + date;
  $.get(url, function (data, status) {
    console.log(data);
    // alert("Proses sync, klik tombol refresh setelah beberapa saat..");
  });
}

function syncSalesLine() {
  var date = $("#date").val();
  var url = ip_local + "/pi_cyber/api/cyber/sync_sales_line.php?date=" + date;
  $.get(url, function (data, status) {
    console.log(data);
    // alert("Proses sync, klik tombol refresh setelah beberapa saat..");
  });
}

function syncSalesCashierBalance() {
  var date = $("#date").val();
  var url =
    ip_local + "/pi_cyber/api/cyber/sync_sales_cashierbalance.php?date=" + date;
  $.get(url, function (data, status) {
    console.log(data);
    // alert("Proses sync, klik tombol refresh setelah beberapa saat..");
  });
}

function syncSalesDeleted() {
  var date = $("#date").val();
  var url =
    ip_local + "/pi_cyber/api/cyber/sync_sales_deleted.php?date=" + date;
  $.get(url, function (data, status) {
    console.log(data);
    // alert("Proses sync, klik tombol refresh setelah beberapa saat..");
  });
}

function syncSalesShopSales() {
  var date = $("#date").val();
  var url =
    ip_local + "/pi_cyber/api/cyber/sync_sales_shopsales.php?date=" + date;
  $.get(url, function (data, status) {
    console.log(data);
    // alert("Proses sync, klik tombol refresh setelah beberapa saat..");
  });
}

function syncSales() {
  //run all function
  syncSalesHeader();
  syncSalesLine();
  syncSalesCashierBalance();
  syncSalesDeleted();
  syncSalesShopSales();
  alert("Proses sync, klik tombol refresh setelah beberapa saat..");
}

function syncSalesAuto() {
  //run all function
  syncSalesHeader();
  syncSalesLine();
  syncSalesCashierBalance();
  syncSalesDeleted();
  syncSalesShopSales();
}
//run sync sales every 3 minutes
function toDateInputValue(dateObject) {
  const local = new Date(dateObject);
  local.setMinutes(dateObject.getMinutes() - dateObject.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
}

function getSales() {
  var date = $("#date").val();
  var url = ip_local + "/pi_cyber/api/cyber/get_sales.php?date=" + date;
  $.get(url, function (data, status) {
    console.log(data);
    $("#sales").html(data);
  });
}
getSales();

setInterval(syncSalesAuto, 180000);
setInterval(getSales, 90000);

const btnback = document.getElementById("btnback");
btnback.addEventListener("click", function (event) {
  window.location.href = `file:///${__dirname}/home.html`;
});