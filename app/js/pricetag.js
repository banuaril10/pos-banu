require("jquery");
require("popper.js");
require("bootstrap");
var $ = require("jquery");

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
  window.location.href = `file:///${__dirname}/home.html`;
});


function getproductinfo() {
  $.ajax({
    url: "http://" + api_storeapps + "/pi_cyber/api/cyber/get_product_info.php",
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

var producttable = $("#tableproduct").DataTable({
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
              '<input type="checkbox" name="chkproduct" value="' +
              data +
              '" checked>'
            );
          } else {
            return (
              '<input type="checkbox" name="chkproduct" value="' + data + '">'
            );
          }
        } else {
          return (
            '<input type="checkbox" name="chkproduct" value="' + data + '">'
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

// btncheckall and save checked product from datatable to local storage
const btncheckall = document.getElementById("btncheckall");
btncheckall.addEventListener("click", function (event) {
  var chkproduct = document.getElementsByName("chkproduct");
  var arrproduct = [];

  if (localStorage.getItem("arrproduct") != null) {
    arrproduct = JSON.parse(localStorage.getItem("arrproduct"));
  }

  for (var i = 0; i < chkproduct.length; i++) {
    //check if product is already in local storage
    if (arrproduct.includes(chkproduct[i].value)) {
      //uncheck product
      chkproduct[i].checked = false;
      //remove product from local storage
      arrproduct.splice(arrproduct.indexOf(chkproduct[i].value), 1);
    } else {
      //checked product
      chkproduct[i].checked = true;
      //add product to local storage
      arrproduct.push(chkproduct[i].value);
    }
  }

  localStorage.setItem("arrproduct", JSON.stringify(arrproduct));
  console.log(localStorage.getItem("arrproduct"));
});

// btnuncheckall;
const btnuncheckall = document.getElementById("btnuncheckall");
btnuncheckall.addEventListener("click", function (event) {
  var chkproduct = document.getElementsByName("chkproduct");
  var arrproduct = [];
  var arrproductnull = [];

  if (localStorage.getItem("arrproduct") != null) {
    arrproduct = JSON.parse(localStorage.getItem("arrproduct"));
  }

  for (var i = 0; i < chkproduct.length; i++) {
    if (arrproduct.includes(chkproduct[i].value)) {
      chkproduct[i].checked = false;
      //arrproduct.splice(arrproduct.indexOf(chkproduct[i].value),1);
    }
  }

  localStorage.setItem("arrproduct", JSON.stringify(arrproductnull));
  // localStorage.setItem('arrproduct',JSON.stringify(arrproduct));
  // console.log(localStorage.getItem('arrproduct'));
});

//checked product from local storage
function checkproduct() {
  var chkproduct = document.getElementsByName("chkproduct");
  var arrproduct = [];
  if (localStorage.getItem("arrproduct") != null) {
    arrproduct = JSON.parse(localStorage.getItem("arrproduct"));
  }

  for (var i = 0; i < chkproduct.length; i++) {
    if (arrproduct.includes(chkproduct[i].value)) {
      chkproduct[i].checked = true;
    }
  }
}

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
