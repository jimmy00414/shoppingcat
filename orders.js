// scripts/orders.js
$(document).ready(function () {
    var orders = [
      { id: 1, name: "商品A", price: 100, quantity: 2, status: "已出貨", payment: "已付款" },
      { id: 2, name: "商品B", price: 200, quantity: 1, status: "未出貨", payment: "未付款" },
    ];
  
    var $orderTableBody = $("#orderTableBody");
  
    orders.forEach(function (order) {
      var row = `
        <tr>
          <td>${order.id}</td>
          <td>${order.name}</td>
          <td>${order.price}</td>
          <td>${order.quantity}</td>
          <td>${order.status}</td>
          <td>${order.payment}</td>
          <td><button class="btn btn-danger btn-sm delete-order" data-id="${order.id}">刪除</button></td>
        </tr>
      `;
      $orderTableBody.append(row);
    });
  
    $orderTableBody.on("click", ".delete-order", function () {
      var orderId = $(this).data("id");
      $(this).closest("tr").remove();
      // 這裡應該加入Ajax請求，通知後端刪除訂單
      console.log("訂單已刪除：", orderId);
    });
  });
  