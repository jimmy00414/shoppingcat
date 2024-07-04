// 自己的網址路徑
// let api_path = "peter77730";
// let token = "mMbOGWzLLGahdTzsOQ5Giq6aTOA3";
let api_path =sessionStorage.api_path;
let token = sessionStorage.token;

const orderTableWrap = document.querySelector('.orderTableWrap');
function loginInit(){
if(api_path == undefined){
  orderTableWrap.innerHTML= `<h2 class="loginLogin">請登入管理員系統</h2>`
}else{
  init();
}
}

// menu toggle
let menuOpenBtn = document.querySelector(".menuToggle");
let linkBtn = document.querySelectorAll(".topBar-menu a");
let menu = document.querySelector(".topBar-menu");
menuOpenBtn.addEventListener("click", menuToggle);

linkBtn.forEach((item) => {
  item.addEventListener("click", closeMenu);
});

function menuToggle() {
  if (menu.classList.contains("openMenu")) {
    menu.classList.remove("openMenu");
  } else {
    menu.classList.add("openMenu");
  }
}
function closeMenu() {
  menu.classList.remove("openMenu");
}

// 登入畫面
const loginIn = document.querySelector(".loginIn");
const loginInput = document.querySelector(".loginInput");
const addBtnLogin = document.querySelector(".addBtnLogin");
const apiName = document.getElementById("apiName");
const apiKey = document.getElementById("apiKey");
loginInput.addEventListener("click", (item) => {
  loginIn.classList.toggle("d-n");
});

// 驗證登入資訊
addBtnLogin.addEventListener("click", (item) => {
  api_path = apiName.value;
  token = apiKey.value;
  sessionStorage.setItem("api_path", api_path);
  sessionStorage.setItem("token", token);
  myrefresh();
});

function local() {
  api_path = sessionStorage.getItem("api_path");
  token = sessionStorage.getItem("token");
}

const orderPage = document.querySelector(".orderPage-table");
let orderData;
// 取得訂單列表
function getOrderList() {
  axios
    .get(
      `https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`,
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then(function (response) {
      orderData = response.data.orders;
      OrderList();
      revenuePercent();
    })
    .catch(function (error) {
      console.log(error.response.data);
    })
}

function OrderList() {
  let str = "";
  let number = 0;
  str += `<thead>
  <tr>
      <th>訂單編號</th>
      <th>聯絡人</th>
      <th>聯絡地址</th>
      <th>電子郵件</th>
      <th>訂單品項</th>
      <th>訂單金額</th>
      <th>訂單日期</th>
      <th>訂單狀態</th>
      <th>操作</th>
  </tr>
</thead>`;
  orderData.forEach((item) => {
    let product = item.products;
    let productStr = "";
    product.forEach((el) => {
      productStr += `${el.title} * ${el.quantity}<br>`;
    });
    let OrderStatus = "";
    if (item.paid) {
      OrderStatus += "已處理";
    } else {
      OrderStatus += "未處理";
    }
    let timestamp = item.createdAt;
    let date = new Date(timestamp * 1000); //nuix時間轉換成JS時間
    let month = date.getMonth() + 1; //取得月
    let day = date.getDate(); //取得日
    let year = date.getFullYear(); //取得年
    str += `<tr>
        <td>${item.id}</td>
        <td>
          <p>${item.user.name}</p>
          <p>${item.user.tel}</p>
        </td>
        <td>${item.user.address}</td>
        <td>${item.user.email}</td>
        <td>
          <p>${productStr}</p>
        </td>
        <td>$${item.total}</td>
        
        <td>${year}/${month}/${day}</td>
        <td class="orderStatusList">
          <a class="orderStatus" href="##" data-order=${number}>${OrderStatus}</a>
        </td>
        <td>
          <input type="button" data-number=${number} class="delSingleOrder-Btn" value="刪除">
        </td>
    </tr>`;
    number++;
  });
  orderPage.innerHTML = str;
  delSingle();
  editOrderData();
}

// 刪除全部訂單
const discardAllBtn = document.querySelector(".discardAllBtn");

discardAllBtn.addEventListener("click", (e) => {
  deleteAllOrder();
});

function deleteAllOrder() {
  axios
    .delete(
      `https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then(function (response) {
      myrefresh();
    })
    .catch(function (error) {
      console.log(error.response.data);
    })
}

// 刪除特定訂單
function delSingle() {
  const delSingleOrder = document.querySelectorAll("[data-number]");
  delSingleOrder.forEach((item) => {
    item.addEventListener("click", (el) => {
      let orderId = orderData[item.dataset.number].id;
      console.log(orderId);
      orderData.splice(item.dataset.number, 1);
      deleteOrderItem(orderId);
    });
  });
}

function deleteOrderItem(orderId) {
  axios
    .delete(
      `https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders/${orderId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then(function (response) {
      myrefresh();
    })
    .catch(function (error) {
      console.log(error.response.data);
    })
}

// 修改訂單狀態
function editOrderData() {
  const orderStatus = document.querySelectorAll("[data-order]");
  orderStatus.forEach((item) => {
    item.addEventListener("click", (el) => {
      if (item.textContent == "未處理") {
        item.textContent = "已處理";
      } else {
        item.textContent = "未處理";
      }
      let orderId = orderData[item.dataset.order].id;
      let nowPaid = orderData[item.dataset.order].paid;
      let newPaid;
      if (nowPaid == true) {
        newPaid = false;
      } else {
        newPaid = true;
      }
      editOrderList(orderId, newPaid);
    });
  });
}

function editOrderList(orderId, newPaid) {
  axios
    .put(
      `https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`,
      {
        data: {
          id: orderId,
          paid: newPaid,
        },
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then(function (response) {
    })
    .catch(function (error) {
      console.log(error.response.data);
    })
}

// 營收比重資料整理
let newProductsNumArr;
function revenuePercent() {
  let productsNum = {};
  orderData.forEach((item) => {
    let product = item.products;
    product.forEach((el) => {
      let price = el.price;
      if (productsNum[el.title] == undefined) {
        productsNum[el.title] = price;
      } else {
        productsNum[el.title] += price;
      }
      let productsNumArr = Object.entries(productsNum).map(([Name, Num]) => {
        return [Name, Num];
      }); //將營收統整的物件轉為陣列
      newProductsNumArr = productsNumArr.sort(compare("Num")); //陣列由函式compare方式排序
    });
  });
  c3Arr(newProductsNumArr);
}

// 比較陣列數值大小重新排序
function compare(property) {
  return function (obj1, obj2) {
    var value1 = obj1[property];
    var value2 = obj2[property];
    return value2 - value1; //由大至小排列
  };
}

// 整理成圖表可使用的Arr，品項小於4筆特定渲染設定
let c3DataArr = [];
function c3Arr(newProductsNumArr) {
  let otherNum = 0;
  if (newProductsNumArr == undefined) {
    c3DataArr.push(["沒有商品,0"]); //沒有商品
  } else if (newProductsNumArr.length == 1) {
    // console.log(c3DataArr); //一項商品
    c3DataArr.push(newProductsNumArr[0]);
  } else if (newProductsNumArr.length == 2) {
    c3DataArr.push(newProductsNumArr[0]);
    c3DataArr.push(newProductsNumArr[1]); //兩項商品
  } else if (newProductsNumArr.length == 3) {
    c3DataArr.push(newProductsNumArr[0]);
    c3DataArr.push(newProductsNumArr[1]);
    c3DataArr.push(newProductsNumArr[2]); //三項商品
  } else {
    c3DataArr.push(newProductsNumArr[0]);
    c3DataArr.push(newProductsNumArr[1]);
    c3DataArr.push(newProductsNumArr[2]); //三項商品以上
    for (let i = 3; i < newProductsNumArr.length; i++) {
      otherNum += newProductsNumArr[i][1];
    }
    c3DataArr.push(["其他", otherNum]);
  }
  c3Generate(c3DataArr);
}

// C3.js
function c3Generate(c3DataArr) {
  let chart = c3.generate({
    bindto: "#chart", // HTML 元素綁定
    data: {
      type: "pie",
      columns: c3DataArr,
    },
  });
}

// C3正確顯示需要畫面重整
function myrefresh() {
  window.location.reload();
}

// 產品後台初始化
function init() {
  local();
  getOrderList();
}

// 進入畫面
loginInit();

