let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let mood = "create";
let temp;
//get total
function gettotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  }
}
//create product
if (localStorage.product != null) {
  dataproduct = JSON.parse(localStorage.product);
} else {
  dataproduct = [];
}

create.onclick = () => {
  let newproduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ad: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  //count of obj created
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newproduct.count < 400
  ) {
    if (mood === "create") {
      if (newproduct.count > 1) {
        for (let i = 0; i < newproduct.count; i++) {
          dataproduct.push(newproduct);
        }
      } else {
        dataproduct.push(newproduct);
      }
    } else {
      dataproduct[temp] = newproduct;
      count.style.display = "inline";
      create.innerHTML = "create";
    }
  } else {
    cleardata();
  }
  //save local storage
  localStorage.setItem("product", JSON.stringify(dataproduct));

  showdata();
  deletebtn();
};
//cleardata
function cleardata() {
  (title.value = ""),
    (price.value = ""),
    (taxes.value = ""),
    (ads.value = ""),
    (discount.value = ""),
    (total.innerHTML = ""),
    (count.value = ""),
    (category.value = "");
}
//showdata
function showdata() {
  gettotal();
  let table = "";
  for (let i = 0; i < dataproduct.length; i++) {
    table += `
          <tr>
              <td>${i + 1}</td>
              <td>${dataproduct[i].title}</td>
              <td>${dataproduct[i].price}</td>
               <td>${dataproduct[i].taxes}</td>
               <td>${dataproduct[i].ad}</td>
              <td>${dataproduct[i].discount}</td>
              <td>${dataproduct[i].total}</td>
              <td>${dataproduct[i].category}</td>
             
              <td><button id="update" onclick="updatebtn(${i})">update</button></td>
              <td><button onclick='deletedata(${i})' id="delete">delete</button></td>
            </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
}
showdata();

//delete

function deletedata(i) {
  dataproduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataproduct);
  showdata();
}
//delete all
let btndeleteall = document.getElementById("deleteall");
function deletebtn() {
  if (dataproduct.length > 0) {
    btndeleteall.innerHTML = `  <button onclick="deleteAll()">delete all(${dataproduct.length})</button>
        `;
  } else {
    btndeleteall.innerHTML = "";
  }
}
function deleteAll() {
  localStorage.clear();
  dataproduct.splice(0);
  showdata();
  deletebtn();
}
//update button
function updatebtn(i) {
  title.value = dataproduct[i].title;
  price.value = dataproduct[i].price;
  taxes.value = dataproduct[i].taxes;
  ads.value = dataproduct[i].ads;
  discount.value = dataproduct[i].discount;
  category.value = dataproduct[i].category;
  gettotal();
  temp = i;
  mood = "update";
  count.style.display = "none";
  create.innerHTML = "update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
