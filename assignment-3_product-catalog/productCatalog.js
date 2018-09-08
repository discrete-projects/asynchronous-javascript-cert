/*jshint esversion: 6 */

/* API hook for our library js functions */

let promise1 = api.searchAllProducts();
let promise2 = api.searchProductById(42);
let promise3 = api.searchProductsByPrice(200, 25);
let promise4 = api.searchProductsByType('Book');


const processSearch = (searchId, searchType, searchPrice) => {
  if (searchId) {
    api.searchProductById(searchId).then(val => {
      return Promise.all([api.searchProductsByPrice(val.price, 50), api.searchProductsByType(val.type), val]);
    }).then(val => {
      let similarArray = getIntersection(val[0], val[1], val[2], val[3], val[4], val[2].id);
      updateExaminedText(val[2]);
      updateTable('similarTable', similarArray);
    }).catch(val => {
      alert(val);
    });
  } else if (searchType) {
    api.searchProductsByType(searchType).then(val => {
      let typeId = Object.values(val[0]);
      processSearch(typeId[0])
    }).catch(val => {
      alert(val);
    });
  } else if (searchPrice) {
    api.searchProductsByPrice(searchPrice, 50).then(val => {
      let typeId = Object.values(val[0]);
      processSearch(typeId[0])
    }).catch(val => {
      alert(val);
    });
  }
};

const getIntersection = (arrA, arrB, searchedId) => {
  let samePrice = arrA;
  let sameType = arrB;
  let similarArray = [];
  samePrice.forEach(function (obj1) {
    sameType.forEach(function (obj2) {
      if (obj1.id == obj2.id && obj1.id != searchedId)
        similarArray.push(obj1);
    });
  });
  return similarArray;
};

/* Update returned info */
const updateExaminedText = product => {
  let outputString = "Product Id: " + product.id;

  outputString += "<br> Price: " + product.price;
  outputString += "<br> Type: " + product.type;
  document.querySelector("#productText").innerHTML = outputString;
};


const createTableHeader = (tableId) => {
  let tableHeaderRow = document.createElement('TR');
  let th1 = document.createElement('TH');
  let th2 = document.createElement('TH');
  let th3 = document.createElement('TH');
  let th4 = document.createElement('TH');

  th1.appendChild(document.createTextNode("ProductId"));
  th2.appendChild(document.createTextNode("Type"));
  th3.appendChild(document.createTextNode("Price"));
  th4.appendChild(document.createTextNode("Examine"));
  tableHeaderRow.appendChild(th1);
  tableHeaderRow.appendChild(th2);
  tableHeaderRow.appendChild(th3);
  tableHeaderRow.appendChild(th4);

  document.querySelector(`#${tableId}`).appendChild(tableHeaderRow);
};

const updateTable = (tableId, productArray) => {
  let tableBody = document.querySelector(`#${tableId}`);
  //reset table
  while (tableBody.hasChildNodes()) {
    tableBody.removeChild(tableBody.firstChild);
  }
  //create table header
  createTableHeader(tableId);
  //populate table rows
  for (i = 0; i < productArray.length; i++) {
    let tr = document.createElement('TR');
    let td1 = document.createElement('TD');
    let td2 = document.createElement('TD');
    let td3 = document.createElement('TD');
    let td4 = document.createElement('button');

    td4.addEventListener('click', function () {
      processSearch(this.parentNode.firstChild.innerHTML);
    });

    td1.appendChild(document.createTextNode(productArray[i].id));
    td2.appendChild(document.createTextNode(productArray[i].type));
    td3.appendChild(document.createTextNode(productArray[i].price));
    td4.appendChild(document.createTextNode("Examine"));
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tableBody.appendChild(tr);
  }
};

/* We will use the library's api.searchAllProducts() method call to get a Promise containing an array of all of the products in the catalog. We will then use the updateTable(tableId,productArray) method to populate the "List of All Products" table with the array of catalog products. */

api.searchAllProducts().then(function (value) {
  updateTable('allTable', value);
});

/* Event Handlers */
document.querySelector("#idInputButton").addEventListener('click', function () {
  let id = document.querySelector('#idInput').value
  let idUpper = id.charAt(0).toUpperCase() + id.substr(1);

  processSearch(idUpper, undefined, undefined);
});

document.querySelector("#typeInputButton").addEventListener('click', function () {
  let type = document.querySelector('#typeInput').value;
  let typeUpper = type.charAt(0).toUpperCase() + type.substr(1);
  processSearch(undefined, typeUpper, undefined);
});

document.querySelector("#priceInputButton").addEventListener('click', function () {
  let price = document.querySelector('#priceInput').value;
  let priceUpper = price.charAt(0).toUpperCase() + price.substr(1);
  processSearch(undefined, undefined, priceUpper);
});