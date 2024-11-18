// ============================== DEFIEND ALL VARAIBLES ======================================
let productName = document.getElementById("product-name"),
  productCategory = document.getElementById("product-category"),
  productQty = document.getElementById("product-qty"),
  productPrice = document.getElementById("product-price"),
  productSearch = document.getElementById("search"),
  addButton = document.getElementById("add"),
  updateButton = document.getElementById("update-product"),
  qty = [],
  totalPrice = [],
  myData = [];
// ================================= ADD PRODUCTS ============================================
function addProducts() {
  let dataContainer = {
    pName: productName.value.toLowerCase(),
    pCategory: productCategory.value.toLowerCase(),
    pQty: +productQty.value,
    pPrice: +productPrice.value,
    dateTime: new Date().toLocaleString(),
  };
  let totalPriceProduct = dataContainer.pPrice * dataContainer.pQty;
  let totalQty = dataContainer.pQty;
  if (dataContainer.pName != "" && isNaN(dataContainer.pName) && dataContainer.pCategory != "" && isNaN(dataContainer.pCategory) && dataContainer.pPrice != "") {
    myData.push(dataContainer);
    qty.push(totalQty);
    totalPrice.push(totalPriceProduct);
    productName.style.border = "2px solid green";
    productCategory.style.border = "2px solid green";
    productQty.style.border = "2px solid green";
    productPrice.style.border = "2px solid green";
    document.getElementById("delete-all-product").innerHTML = `Delete Product (${myData.length})`;
    for (i = 1; i < myData.length; i++) {
      if (dataContainer.pName == myData[i - 1].pName) {
        myData.pop(dataContainer);
        qty.pop(totalQty);
        totalPrice.pop(totalPriceProduct);
      }
    }
    insertDataTable();
  } else {
    productName.style.border = "2px solid red";
    productCategory.style.border = "2px solid red";
    productQty.style.border = "2px solid red";
    productPrice.style.border = "2px solid red";
  }
  clearData();
}
// ================================= UPDATE PRODUCTS ==========================================
function updateProducts(i) {
  document.getElementById("update-product").style.display = "none";
  addButton.style.display = "inline-block";
  let Total = totalPrice.reduce((a, b) => +a + +b, 0);
  let total_Qty = qty.reduce((a, b) => +a + +b, 0);
  let insertMainData = "";
  insertMainData += `
    <tr>
      <td>${i + 1}</td>
      <td>${(myData[i].pName = productName.value)}</td>
      <td>${(myData[i].pCategory = productCategory.value)}</td>
      <td>${(myData[i].pQty = +productQty.value)}</td>
      <td>${(myData[i].pPrice = +productPrice.value)}</td>
      <td>${(totalPrice[i] = +productQty.value * +productPrice.value)}</td>
      <td>${myData[i].dateTime}</td>
    </tr>
    `;
  qty[i] = +productQty.value;
  clearData();
  insertDataTable();
}
// ================================= INSERT PRODUCTS ==========================================
function insertDataTable() {
  let TotalPrice = totalPrice.reduce((a, b) => +a + +b, 0);
  let totalQty = qty.reduce((a, b) => +a + +b, 0);
  let insertMainData = "";
  let resultTotal = "";
  for (let i = 0; i < myData.length; i++) {
    insertMainData += `
      <tr id="tr">
      <td>${i + 1}</td>
        <td>${myData[i].pName}</td>
        <td>${myData[i].pCategory}</td>
        <td>${myData[i].pQty}</td>
        <td>${myData[i].pPrice}</td>
        <td>${totalPrice[i]}</td>
        <td>${myData[i].dateTime}</td>
        <td class="update" onclick='updateProduct(${i})'><i class="fa-solid fa-file-pen icon__pointer" id="update-icon"></i></td>
        <td class="delete" onclick='deleteProduct(${i})'><i class="fa-solid fa-trash icon__pointer" id="delete-icon"></i></td>
      </tr>
      `;
    resultTotal = `
    <tr>
      <td colspan='4'>Total Qty = ${totalQty}</td>
      <td colspan='2'>Total Price = ${TotalPrice}</td>
      <td colspan="3">Date & Time ${myData[i].dateTime}</td> 
    </tr>
  `;
  }
  document.getElementById("table").style.display = "block";
  document.getElementById("insert-data").innerHTML = insertMainData;
  document.getElementById("total").innerHTML = resultTotal;
}
// ================================= CLEAR DATA ==============================================
function clearData() {
  productName.value = "";
  productCategory.value = "";
  productQty.value = "";
  productPrice.value = "";
}
// ================================= DELETE ALL PRODUCTS =====================================
function deleteAllProduct() {
  myData.splice(0);
  totalPrice.splice(0);
  qty.splice(0);
  document.getElementById("delete-all-product").innerHTML = `
  Delete Product (${myData.length})
  `;
  insertDataTable();
}
// ================================ SEARCH products ==========================================
function searchProducts() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search");
  filter = input.value;
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
// ================================= UPDATE DATA =============================================
function updateProduct(i) {
  productName.value = myData[i].pName;
  productCategory.value = myData[i].pCategory;
  productQty.value = myData[i].pQty;
  productPrice.value = myData[i].pPrice;
  document.getElementById("update-product").innerHTML = `<button onclick="updateProducts(${i});" id="update-button">Update Product</button>`;
  addButton.style.display = "none";
  document.getElementById("update-product").style.display = "inline-block";
}
// ================================= DELETE PRODUCT =========================================
function deleteProduct(i) {
  qty.splice(i, 1);
  totalPrice.splice(i, 1);
  myData.splice(i, 1);
  document.getElementById("delete-all-product").innerHTML = `
  Delete All Product (${myData.length})
  `;
  insertDataTable();
}

function analysis() {
  document.getElementById("form").style.display = "block";
}

function loginForm() {
  let userNameInput = document.getElementById("username");
  let userPasswordInput = document.getElementById("password");
  if (userNameInput.value === "mahmoud" && userPasswordInput.value === "mahmoud") {
    document.getElementById("form").style.display = "none";
  } else {
    userNameInput.style.border = "2px solid red";
    userPasswordInput.style.border = "2px solid red";
  }
}

function formClose() {
  document.getElementById("form").style.display = "none";
}
