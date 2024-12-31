require("jquery");
require("popper.js");
require("bootstrap");
var $ = require("jquery");
let remote = require('electron').remote
// get cashier information
$("#loaderpos").html(
  "<img id='loading-image' src='./img/loading2.gif' alt='Loading...' />"
);
getinfo();
getproductinfo();
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
  window.location.href = `file:///${__dirname}/pricetag.html`;
});


const btnprintpricetag = document.getElementById("btnprintpricetag");
btnprintpricetag.addEventListener("click", function (event) {
  var arrproduct = JSON.parse(localStorage.getItem("arrproduct"));
  var arrcopy = JSON.parse(localStorage.getItem("arrcopy"));
  cetak_pricetag(arrproduct, arrcopy);
});

const btnprintplanogram = document.getElementById("btnprintplanogram");
btnprintplanogram.addEventListener("click", function (event) {
  var arrproduct = JSON.parse(localStorage.getItem("arrproduct"));
  cetak_planogram(arrproduct);
});


// cetak table planogram with column sku, name, rack
function cetak_planogram(arrproduct) {
  $.ajax({
    url: "http://" + api_storeapps + "/pi/api/cyber/get_pricetag_plano.php",
    type: "POST",
    data: { arrproduct: arrproduct },
    beforeSend: function () {
      $("#statussync").html("proses get");
    },
    async: false,
    success: function (dataResult) {
      var dataResult = JSON.parse(dataResult);
      var hasil = cetak_planogram_table(dataResult);
      // console.log(hasil);

      createWindowPriceTag(hasil);
    },
  });
}



// function cetak_pricetag_promo(arrproduct) {
//   $.ajax({
//     url: "http://" + api_storeapps + "/pi/api/cyber/get_pricetag_promo.php",
//     type: "POST",
//     data: { arrproduct: arrproduct },
//     beforeSend: function () {
//       $("#statussync").html("proses get");
//     },
//     async: false,
//     success: function (dataResult) {
//       var dataResult = JSON.parse(dataResult);
//       var hasil = cetak_promo(dataResult);
//       // console.log(hasil);

//       createWindowPriceTag(hasil);
//     },
//   });
// }

function cetak_pricetag(arrproduct, arrcopy) {
  //foreach arrproduct
  // var arrcopy = [];
  // arrproduct.forEach(function (item) {
  //   //baca value copy di halaman lain datatable
  //   var copy = $("#copy" + item).val();

  //   arrcopy.push(copy);

    
  // });

  // // var arrcopy = JSON.parse(arrcopy);
  // console.log(arrcopy);


  $.ajax({
    url: "http://" + api_storeapps + "/pi/api/cyber/get_pricetag.php",
    type: "POST",
    data: { arrproduct: arrproduct, arrcopy : arrcopy },
    beforeSend: function () {
      $("#statussync").html("proses sync shortcut");
    },
    async: false,
    success: function (dataResult) {
      var dataResult = JSON.parse(dataResult);
      var hasil = cetak_reguler(dataResult);
      // console.log(hasil);

      createWindowPriceTag(hasil);
    },
  });
}

function getproductinfo() {
  $.ajax({
    url: "http://" + api_storeapps + "/pi/api/cyber/get_product_info.php",
    type: "GET",
    async: false,
    success: function (dataResult) {
      console.log(dataResult);
      var dataResult = JSON.parse(dataResult);
      $("#divinttotal").html(dataResult.total_product);
      $("#divintdiscount").html(dataResult.total_product_discount);
    },
  });
  // var objproductinfo=get_auth_data("/pos/mproduct_info",{},false);
  // if (objproductinfo.result=='Success' && objproductinfo.data !=null) {
  // $.each(objproductinfo.data, function (i,item) {
  // $('#divinttotal').html(item.inttotal);
  // $('#divintdiscount').html(item.intdiscount);
  // $('#divintnosale').html(item.intnosale);
  // $('#divintmemberdiscount').html(item.intdiscountmember);

  // });
  // };
}

producttable("");
function producttable(stock){
$("#tableproduct").DataTable({
  sDom:
    "<'dt-toolbar'<'col-sm-6' <'toolbar'>><'col-sm-12'f>>" +
    "t" +
    "<'dt-toolbar-footer'<'col-sm-2 col-xs-2 hidden-xs'l><'col-sm-4 col-xs-4 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
  oLanguage: {
    sSearch:
      '<span class="input-group-addon"><i class="fa fa-search"></i></span>',
  },
  scrollX: false,
  autoWidth: true,
  processing: true,
  serverSide: true,
  ajax: {
    url: api_url + "/pos/table?f1=pos_mproduct_all_view&f2=",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    headers: { Authorization: localStorage.getItem("token").replace('"', "") },
    data: function (d) {
      return JSON.stringify(d);
    },
  },
  language: {
    loadingRecords: "&nbsp;",
    processing: "Lagi Loading...",
  },
  columns: [
    {
      data: "sku",
      render: function (data, type, full, meta) {
        //check checked product from local storage
        if (localStorage.getItem("arrproduct") != null) {
          var arrproduct = JSON.parse(localStorage.getItem("arrproduct"));
          if (arrproduct.includes(data)) {
            return (
              '<input type="checkbox" class="largerCheckbox" name="checkbox[]" value="' +
              data +
              '" checked>'
            );
          } else {
            return (
              '<input type="checkbox" class="largerCheckbox" name="checkbox[]" value="' +
              data +
              '">'
            );
          }
        } else {
          return (
            '<input type="checkbox" class="largerCheckbox" name="checkbox[]" value="' +
            data +
            '">'
          );
        }
        // return '<input type="checkbox" name="chkproduct" value="'+data+'">';
      },
    },
    { data: "sku" },
    { data: "name" },
    { data: "price", className: "text-right" },
    { data: "discount", className: "text-right" },
    { data: "discount_member", className: "text-right" },
    { data: "stockqty", className: "text-right" },
    { data: "shortcut", className: "text-center" },
    { data: "isnosale", className: "text-center" },
    { data: "rack", className: "text-center" },
    { data: "buygetremark", className: "text-center" },
  ],
});
}


//filter datatable
$("#filterstock").on("click", function () {

  var table = $("#tableproduct").DataTable();
  table.columns(6).search("0").draw();

});



// btncheckall and save checked product from datatable to local storage
const btncheckall = document.getElementById("btncheckall");
btncheckall.addEventListener("click", function (event) {
  var chkproduct = document.getElementsByName("checkbox[]");
  var arrproduct = [];
  var arrcopy = [];

  if (localStorage.getItem("arrproduct") != null) {
    arrproduct = JSON.parse(localStorage.getItem("arrproduct"));
  }

  if (localStorage.getItem("arrcopy") != null) {
    arrcopy = JSON.parse(localStorage.getItem("arrcopy"));
  }


  for (var i = 0; i < chkproduct.length; i++) {
    //check if product is already in local storage
    if (arrproduct.includes(chkproduct[i].value)) {
      //uncheck product
      chkproduct[i].checked = false;
      //remove product from local storage
      arrproduct.splice(arrproduct.indexOf(chkproduct[i].value), 1);
      //remove arrcopy where sku = chkproduct[i].value
      arrcopy = arrcopy.filter((item) => item.sku !== this.value);

    } else {
      //checked product
      chkproduct[i].checked = true;
      //add product to local storage
      arrproduct.push(chkproduct[i].value);
      //add arrcopy
      var copy = $("#copy" + chkproduct[i].value).val();
      if (copy == "") {
        copy = 1;
      }
      arrcopy.push({sku:chkproduct[i].value, copy:copy});
    }
  }

  localStorage.setItem("arrproduct", JSON.stringify(arrproduct));
  localStorage.setItem("arrcopy", JSON.stringify(arrcopy));
  console.log(localStorage.getItem("arrproduct"));
  console.log(localStorage.getItem("arrcopy"));
});

// btnuncheckall;
const btnuncheckall = document.getElementById("btnuncheckall");
btnuncheckall.addEventListener("click", function (event) {
  var chkproduct = document.getElementsByName("checkbox[]");
  var arrproduct = [];
  var arrproductnull = [];
  var arrcopynull = [];

  if (localStorage.getItem("arrproduct") != null) {
    arrproduct = JSON.parse(localStorage.getItem("arrproduct"));
  }

  if (localStorage.getItem("arrcopy") != null) {
    arrcopy = JSON.parse(localStorage.getItem("arrcopy"));
  }


  for (var i = 0; i < chkproduct.length; i++) {
    if (arrproduct.includes(chkproduct[i].value)) {
      chkproduct[i].checked = false;
      //arrproduct.splice(arrproduct.indexOf(chkproduct[i].value),1);
    }
  }

  localStorage.setItem("arrproduct", JSON.stringify(arrproductnull));
  localStorage.setItem("arrcopy", JSON.stringify(arrcopynull));
  //remove arrcopy where sku = chkproduct[i].value
  
  // localStorage.setItem('arrproduct',JSON.stringify(arrproduct));
  console.log(localStorage.getItem('arrproduct'));
  console.log(localStorage.getItem('arrcopy'));
});


//check and unchecked value this save checked product from datatable to local storage
$("#tableproduct tbody").on("click", "input[type='checkbox']", function () {
  var chkproduct = document.getElementsByName("checkbox[]");
  var arrproduct = [];
  var arrcopy = [];

  if (localStorage.getItem("arrproduct") != null) {
    arrproduct = JSON.parse(localStorage.getItem("arrproduct"));
  }

  if (localStorage.getItem("arrcopy") != null) {
    arrcopy = JSON.parse(localStorage.getItem("arrcopy"));
  }


 
      //remove when unchecked
      if (!this.checked) {
        arrproduct.splice(arrproduct.indexOf(this.value), 1);
        //remove arrcopy where sku = chkproduct[i].value
        arrcopy = arrcopy.filter((item) => item.sku !== this.value);

      } else {
        arrproduct.push(this.value);
        //add arrcopy
        var copy = $("#copy" + this.value).val();
        if (copy == "") {
          copy = 1;
        }
        arrcopy.push({sku:this.value, copy:copy});

      }
      

      //add when checked


  localStorage.setItem("arrproduct", JSON.stringify(arrproduct));
  localStorage.setItem("arrcopy", JSON.stringify(arrcopy));

  console.log(localStorage.getItem("arrproduct")); 
  console.log(localStorage.getItem("arrcopy"));

});


function createWindowPriceTag(texthtml) {
  const Store = require("electron-store");
  const store = new Store();
  //call store path_documents
  var path_documents = store.get("path_documents");


  let mainWindow = new BrowserWindow({
    fullscreen: false,
    width: 1000,
    height: 600,
    icon: path.join(__dirname, "assets/icons/png/icon.png"),
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  //create file cetak_pricetag.html if not exists

  var path_cetak = path_documents + "/cetak_pricetag.html";

  var writeStream = fs.createWriteStream(path_cetak);
  writeStream.end();

  fs.writeFileSync(
    path.join(path_cetak),
    "<style>@media print{@page {size: potrait; width: 216mm;height: 280mm;margin-top: 15;margin-right: 2;margin-left: 2; padding: 0;} margin: 0; padding: 0;} table { page-break-inside:auto }tr{ page-break-inside:avoid; page-break-after:auto }</style>" +
      texthtml
  );

  mainWindow.loadFile(path.join(path_cetak));

  setTimeout(function () {
    mainWindow.webContents.print({ silent: false });
  }, 1000);
}

//get value id stocking
var stocking = 0;
var racking = "";
const stock = document.getElementById("stock");
const rack = document.getElementById("rack");

get_data_product(stocking, racking);

filterstock.addEventListener("click", function (event) {
  stocking = stock.value;
  racking = rack.value;
  //add html message
  // id message;
  // var message = document.getElementById("message");
  // message.innerHTML = "Proses sync data";

  // $("#loaderpos").show();
  $("#tableproductreguler").DataTable().destroy();
  get_data_product(stocking, racking);
  // $("#loaderpos").hide();
  // message.innerHTML = "Selesai sync data";
});




//append data rack to select option
$.ajax({
  url: "http://" + api_storeapps + "/pi/api/cyber/get_product_rack.php",
  type: "GET",
  async: false,
  success: function (dataResult) {
    var dataResult = JSON.parse(dataResult);
    $.each(dataResult, function (i, item) {
      $("#rack").append(
        $("<option>", {
          value: item.rack,
          text: item.rack,
        })
      );
    });
  },
});


 
// get_data_product(stocking);

// const filterstock = document.getElementById("filterstock");
// filterstock.addEventListener("click", function (event) {
//   console.log("stock : " + stocking);
//   alert("stock : " + stocking);
//   // alert("test : " + test);
//   // $("#tableproductreguler").DataTable().destroy();
//   // get_data_product(stock);
// });




function get_data_product(stock, rack) {
  $("#loaderpos").show();
  $.ajax({
    url: "http://" + api_storeapps + "/pi/api/cyber/get_product_reguler.php?stock=" + stock + "&rack=" + rack,
    type: "GET",
    success: function (dataResult) {
      
      console.log(dataResult);
      var dataResult = JSON.parse(dataResult);
      $("#tableproductreguler").DataTable({
        data: dataResult,
        lengthMenu: [
          [10, 25, 50, 100, 500, 1000, -1],
          [10, 25, 50, 100, 500, 1000, "All"],
        ],
        columns: [
          {
            data: "sku",
            render: function (data, type, full, meta) {
              //check checked product from local storage
              if (localStorage.getItem("arrproduct") != null) {
                var arrproduct = JSON.parse(localStorage.getItem("arrproduct"));
                if (arrproduct.includes(data)) {
                  return (
                    '<input type="checkbox" class="largerCheckbox" name="checkbox[]" value="' +
                    data +
                    '" checked>'
                  );
                } else {
                  return (
                    '<input type="checkbox" class="largerCheckbox" name="checkbox[]" value="' +
                    data +
                    '">'
                  );
                }
              } else {
                return (
                  '<input type="checkbox" class="largerCheckbox" name="checkbox[]" value="' +
                  data +
                  '">'
                );
              }
              // return '<input type="checkbox" name="chkproduct" value="'+data+'">';
            },
          },
          // { data: "no" },
          { data: "sku" },
          { data: "barcode" },
          { data: "name" },
          { data: "price" },
          { data: "rack" },
          { data: "stock" },
          {
            data: "sku",
            render: function (data, type, full, meta) {
              return (
                '<input style="width: 100%" type="number" class="largerCheckbox" id="copy' +
                data +
                '" value="1">'
              );

              // return '<input type="checkbox" name="chkproduct" value="'+data+'">';
            },
          },
        ],
      });
      $("#loaderpos").hide();
    },
  });
}

$("#tableproductreguler").on(
  "click",
  "input[type='checkbox']",
  function () {
    var chkproduct = document.getElementsByName("checkbox[]");
    var arrproduct = [];
    var arrcopy = [];

    if (localStorage.getItem("arrproduct") != null) {
      arrproduct = JSON.parse(localStorage.getItem("arrproduct"));
    }

    if (localStorage.getItem("arrcopy") != null) {
      arrcopy = JSON.parse(localStorage.getItem("arrcopy"));
    }


    //remove when unchecked
    if (!this.checked) {
      arrproduct.splice(arrproduct.indexOf(this.value), 1);
      //splice arrcopy where sku = this.value
      // arrcopy = arrcopy.filter(function (item) {
      //   // return item.sku !== this.value;
      //   alert(item.sku+" | "+this.value);
      // });

      arrcopy = arrcopy.filter((item) => item.sku !== this.value);

      // console.log(arrcopy);



    } else {
      arrproduct.push(this.value);  
      //add arrcopy
      var copy = $("#copy" + this.value).val();
      if (copy == "") {
        copy = 1;
      }
      arrcopy.push({sku:this.value, copy:copy});

    }

    //add when checked

    localStorage.setItem("arrproduct", JSON.stringify(arrproduct));
    localStorage.setItem("arrcopy", JSON.stringify(arrcopy));
    console.log(localStorage.getItem("arrproduct"));
    console.log(localStorage.getItem("arrcopy"));
  }
);




// btnproductcategorysync.addEventListener('click',async function (event){
// var objsync= await post_async_auth_data("/pos/tablecount",{api:api_url,f1:'erp',f2:'m_product_category'},true);
// if (objsync.count>0){
// $('#loaderpos').show();
// var intloop=0;
// var intlimit=500;
// for (var i = 0; i < objsync.count; i=i+intlimit) {
// await post_async_auth_data("/pos/tabledata",{api:api_url,f1:'erp',f2:'proc_m_product_category_sync_view',f3:'pos_mproductcategory_sync',f4:intlimit,f5:intloop*intlimit},true);
// intloop++;
// };
// intloop=0;
// for (var i = 0; i < objsync.count; i=i+intlimit) {
// await post_async_auth_data("/pos/tabledata",{api:api_url,f1:'erp',f2:'proc_m_product_category_sub_sync_view',f3:'pos_mproductcategorysub_sync',f4:intlimit,f5:intloop*intlimit},true);
// intloop++;
// };
// $("#loaderpos").hide();
// getproductinfo();
// $('#tableproduct').DataTable().ajax.reload();
// };
// });

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
